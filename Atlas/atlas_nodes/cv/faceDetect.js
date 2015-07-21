var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        faceDetect
   **************************************************/

  function faceDetect(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function faceDetectConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['imgWidth']);
      var dst0_m = redUtil.jsonIntegerParse(io.faceDetectConfig_imgWidth);
      
      dst["imgWidth"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['imgHeight']);
      var dst1_m = redUtil.jsonIntegerParse(io.faceDetectConfig_imgHeight);
      
      dst["imgHeight"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['faceWidth']);
      var dst2_m = redUtil.jsonIntegerParse(io.faceDetectConfig_faceWidth);
      
      dst["faceWidth"] = dst2 || dst2_m;
      var dst3 = redUtil.jsonIntegerParse(src['faceHeight']);
      var dst3_m = redUtil.jsonIntegerParse(io.faceDetectConfig_faceHeight);
      
      dst["faceHeight"] = dst3 || dst3_m;
      
      return dst;
    }
    
    // call initialize faceDetectInit
    var arg0 = faceDetectConfigNew(config);
    console.log('init faceDetect' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}, null, null
      ])
    }
    var arg2 = function() {
      node.send([
        null, {'payload' : arguments[0]}, null
      ])
    }
    var arg3 = function() {
      node.send([
        null, null, {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.faceDetectInit(arg0 ,arg1 ,arg2 ,arg3));
        
    // call faceDetect onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      var arg0 = config;
      
      //if (!args.hasOwnProperty("1"))
        //throw Error("Input string should have '1' properties as the 2nd parameter of function 'faceDetectOnData'.");
      var arg1 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.faceDetectOnData(arg0, arg1);
    });
        
    // call release function
    node.on('close', function() {
      io.faceDetectRelease(config);
    })
    
  }
  RED.nodes.registerType("faceDetect", faceDetect);
}
