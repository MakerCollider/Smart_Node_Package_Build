var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        camera
   **************************************************/

  function camera(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function cameraConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['interval']);
      var dst0_m = redUtil.jsonIntegerParse(io.cameraConfig_interval);
      
      dst["interval"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['camId']);
      var dst1_m = redUtil.jsonIntegerParse(io.cameraConfig_camId);
      
      dst["camId"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['width']);
      var dst2_m = redUtil.jsonIntegerParse(io.cameraConfig_width);
      
      dst["width"] = dst2 || dst2_m;
      var dst3 = redUtil.jsonIntegerParse(src['height']);
      var dst3_m = redUtil.jsonIntegerParse(io.cameraConfig_height);
      
      dst["height"] = dst3 || dst3_m;
      
      return dst;
    }
    
    // call initialize cameraInit
    var arg0 = cameraConfigNew(config);
    console.log('init camera' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.cameraInit(arg0 ,arg1));
        
    // call camera onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      var arg0 = config;
      
      //if (!args.hasOwnProperty("1"))
        //throw Error("Input string should have '1' properties as the 2nd parameter of function 'cameraOnData'.");
      var arg1 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.cameraOnData(arg0, arg1);
    });
        
    // call release function
    node.on('close', function() {
      io.cameraRelease(config);
    })
    
  }
  RED.nodes.registerType("camera", camera);
}
