var multer = require('multer');
var config = require('./config.js');
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var serveIndex = require('serve-index');

var statTable = {};

var prefix = '/atlas';
var checkType = function(t, types) {
  for(idx in types) {
    if(types[idx] == t)
      return true;
  }
  
  return false;
};

function deleteReq(req, res, next) {

  var item = req.param('target');
  if(item == undefined) {
    res.send("please specify delete target, likes delete?target=abc");
    return;
  }

  var sep = item.split("/");
  if(sep[0] == "") {
    sep.splice(0, 1);
  }

  var thisConfig = config["/" + sep[0]];

  if(thisConfig == undefined) {
    res.send('unkown category ' + sep[0]);
    return;
  }

  sep.splice(0, 1, thisConfig.path);
  var target = sep.join('/');
 
  if(!fs.existsSync(target)) {
    res.status(400).send('no such file ' + item);
    return;
  }

  fs.unlink(target, function(err) {
    if(err) {
      res.status(400).send("Error: " + err);
      return;
    }

    res.send("Succcesfully delete " + item);
  })
}

function queryReq(req, res, next) {
  var query = req.param('stat');
  if( query == undefined) {
    res.send("Please pass query item, likes ?stat=patch");
    return;
  }

  var stat = statTable[query];

  if(stat == undefined) {
    res.status(400).send("no status of " + query);  
    return;
  }

  res.send(JSON.stringify(stat));
};

function genUploadUi(name)
{
  return "<html><form method='post' action='" + prefix  + name + "' enctype='multipart/form-data'> <input type='file' name='fileUploaded'> <input type='submit'> </form></html>"
}

function uploadReq(req, res, next) {

  var rpath = req.path;

  if(rpath.indexOf(prefix) != 0) {
    next();
    return undefined;
  }

  //console.log('recv:   ' + rpath);
  rpath = rpath.replace(prefix, '');

  for(idx in config) {
    if(rpath == idx + 'Upload') {
        res.status(200).send(genUploadUi(idx));
        return;
    }
  }

  //console.log(rpath + " => " + JSON.stringify(config[rpath]));
   
  var info = "Failed!";

  var thisConfig = config[rpath];
  if(!thisConfig) {
    next();
    return undefined;
  }
  
  var dest = thisConfig.path;
  var types = thisConfig.types;
  var bin = thisConfig.run;
  var action = thisConfig.action;

  var uploadInfo = {
    "config" : thisConfig
  };

  multer({

    "dest": dest,

    "onError": function(error, next) {

      uploadInfo["error"] = error;
      console.log("http error: " + error);

      statTable[action] = {
        "status" : "Done",
        "info"   : "upload error: " + error
      };
    },

    "onParseStart" : function() {
      console.log("receving...");
    },

    "rename": function(fieldName, fileName) {
      var newName = thisConfig["rename"];
 
      return newName?newName:fileName;
    },

    "onParseEnd": function() {
      console.log('Done');
      console.log(JSON.stringify(uploadInfo));
      uploadInfo["return"] = statTable[action];
      //res.render('upload.ejs', { "upload_info" : uploadInfo } );
      res.status(200).send("OK");
    },

    "onFileUploadComplete": function(file) {

      var ext = path.extname(file.path);

      if(!checkType(ext, types)) {
        info = ext + " is not supported, only " + JSON.stringify(types) + " is allowed";
        console.log('delete ' + file.path);
        fs.unlinkSync(file.path);

        statTable[action] = {
          "status" : "Done",
          "info"   : "upload cancelled"
        };

      } else {
        uploadInfo["file"] = file;
        console.log('upload ' + file.path);

        statTable[action] = {
          "status" : "Done",
          "info"   : "upload finished"
        };

        if(bin != undefined) {
          var cmd = bin + " " +  file.path;
       
          statTable[action] = {
            "status" : "running cmd",
            "info"   :  cmd
          };

          child_process.execFile(__dirname + "/" + bin, 
                                 [__dirname + "/../" +  file.path], 
                                 {"cwd": __dirname},
                                 function(error, stdout, stderr) {
            var ret = {
              "status" : "Done",
              "info" : "Finished"
            };

            if(error)
              ret["error"] = error;
            else
              ret["error"] = "no error";

            ret["stdout"] = stdout;
            ret["stderr"] = stderr;

            statTable[action] = ret;
 
            console.log("[exec] " + error);
            console.log("[exec] " + stdout);
            console.log("[exec] " + stderr);        

          });
        } 
      }
      
    }

  })(req, res, next);
}

var server, app,express;
var io;
var recvEvent = {};

var clientInfo = {};
var genHtml = require('./genHtml.js');

module.exports = {

  'hook':  function(httpApp, httpServer, httpExpress) {
    server = httpServer;
    app = httpApp;
    express = httpExpress;

    for(idx in config) {
      //app.use(prefix + idx, express.static(config[idx].path));
      //app.use(prefix + idx, serveIndex(config[idx].path, {'icons': true}));
    }

    app.use(uploadReq);
    app.use(prefix, express.static(__dirname + '/html'));
    app.use(prefix, serveIndex(__dirname + '/html', {'icons': true}));
 
    io = require('socket.io').listen(server);   

    io.on('connection', function(socket) {
        console.log('a client connected');
        for(idx in recvEvent) {
            console.log('register ' + idx);
            socket.on(idx, recvEvent[idx]);
        }
    });

    console.log("=====> atlas hook");

    global.atlas = { 
      'on': function(e, cb) {
        recvEvent[e] = cb;
      },
      'emit': function(e, data) {
        io.emit(e, data);
      },
      'genHtml': genHtml,
      'htmlDir': __dirname + '/html'
    };
  }
};
