var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        fakeCamera
   **************************************************/

  function fakeCamera(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function fakeCameraConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['interval']);
      var dst0_m = redUtil.jsonIntegerParse(io.fakeCameraConfig_interval);
      
      dst["interval"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonStringArrayParse(src['imgFile'])
      var dst1_m = redUtil.jsonStringArrayParse(io.fakeCameraConfig_imgFile)
      
      dst["imgFile"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['width']);
      var dst2_m = redUtil.jsonIntegerParse(io.fakeCameraConfig_width);
      
      dst["width"] = dst2 || dst2_m;
      var dst3 = redUtil.jsonIntegerParse(src['height']);
      var dst3_m = redUtil.jsonIntegerParse(io.fakeCameraConfig_height);
      
      dst["height"] = dst3 || dst3_m;
      
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
    
    redUtil.checkInit(io.fakeCameraInit(arg0 ,arg1));
        
    // call fakeCamera onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'fakeCameraOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.fakeCameraOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.fakeCameraRelease(config);
    })
    
  }
  RED.nodes.registerType("fakeCamera", fakeCamera);
}
