var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

module.exports = function(RED) {
  /**************************************************
                        fakeCamera
   **************************************************/

  function fakeCamera(config) {
  
    RED.nodes.createNode(this,config);
    var node = this;

    var RedUtil = require('../../lib/red-util.js')
    var redUtil = new RedUtil(node, config);
    
    // configure function
    function fakeCameraConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['interval']);
      dst["interval"] = dst0 || io.fakeCameraConfig_interval;
      var dst1 = redUtil.jsonStringArrayParse(src['imgFile'])
      dst["imgFile"] = dst1 || io.fakeCameraConfig_imgFile;
      var dst2 = redUtil.jsonIntegerParse(src['width']);
      dst["width"] = dst2 || io.fakeCameraConfig_width;
      var dst3 = redUtil.jsonIntegerParse(src['height']);
      dst["height"] = dst3 || io.fakeCameraConfig_height;
    
      return dst;
    }
    
    // call initialize fakeCameraInit
    var arg0 = fakeCameraConfigNew(config);
    console.log('init fakeCamera' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    io.fakeCameraInit(arg0 ,arg1)
        
    // call onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = msg.payload;
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'fakeCameraOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.fakeCameraOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.fakeCameraRelease()
    })
    
  }
  RED.nodes.registerType("fakeCamera", fakeCamera);
}
