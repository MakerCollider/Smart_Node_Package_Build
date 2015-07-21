var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        rotaryEncoder
   **************************************************/

  function rotaryEncoder(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function rotaryEncoderConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pinA']);
      var dst0_m = redUtil.jsonIntegerParse(io.rotaryEncoderConfig_pinA);
      
      dst["pinA"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['pinB']);
      var dst1_m = redUtil.jsonIntegerParse(io.rotaryEncoderConfig_pinB);
      
      dst["pinB"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['interval']);
      var dst2_m = redUtil.jsonIntegerParse(io.rotaryEncoderConfig_interval);
      
      dst["interval"] = dst2 || dst2_m;
      var dst3 = redUtil.jsonIntegerParse(src['threshold']);
      var dst3_m = redUtil.jsonIntegerParse(io.rotaryEncoderConfig_threshold);
      
      dst["threshold"] = dst3 || dst3_m;
      
      return dst;
    }
    
    // call initialize rotaryEncoderInit
    var arg0 = rotaryEncoderConfigNew(config);
    console.log('init rotaryEncoder' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}, null
      ])
    }
    var arg2 = function() {
      node.send([
        null, {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.rotaryEncoderInit(arg0 ,arg1 ,arg2));
        
    // call rotaryEncoder onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'rotaryEncoderOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.rotaryEncoderOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.rotaryEncoderRelease(config);
    })
    
  }
  RED.nodes.registerType("rotaryEncoder", rotaryEncoder);
}
