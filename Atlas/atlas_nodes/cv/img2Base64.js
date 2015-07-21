var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        img2Base64
   **************************************************/

  function img2Base64(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function img2Base64ConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonStringArrayParse(src['imgType'])
      var dst0_m = redUtil.jsonStringArrayParse(io.img2Base64Config_imgType)
      
      dst["imgType"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['quality']);
      var dst1_m = redUtil.jsonIntegerParse(io.img2Base64Config_quality);
      
      dst["quality"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['maxWidth']);
      var dst2_m = redUtil.jsonIntegerParse(io.img2Base64Config_maxWidth);
      
      dst["maxWidth"] = dst2 || dst2_m;
      var dst3 = redUtil.jsonIntegerParse(src['maxHeight']);
      var dst3_m = redUtil.jsonIntegerParse(io.img2Base64Config_maxHeight);
      
      dst["maxHeight"] = dst3 || dst3_m;
      
      return dst;
    }
    
    // call initialize img2Base64Init
    var arg0 = img2Base64ConfigNew(config);
    console.log('init img2Base64' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.img2Base64Init(arg0 ,arg1));
        
    // call img2Base64 onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      var arg0 = config;
      
      //if (!args.hasOwnProperty("1"))
        //throw Error("Input string should have '1' properties as the 2nd parameter of function 'img2Base64OnData'.");
      var arg1 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.img2Base64OnData(arg0, arg1);
    });
        
    // call release function
    node.on('close', function() {
      io.img2Base64Release(config);
    })
    
  }
  RED.nodes.registerType("img2Base64", img2Base64);
}
