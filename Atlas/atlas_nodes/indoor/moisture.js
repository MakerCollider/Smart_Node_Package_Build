var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        moisture
   **************************************************/

  function moisture(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function moistureConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['aioPin']);
      var dst0_m = redUtil.jsonIntegerParse(io.moistureConfig_aioPin);
      
      dst["aioPin"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['interval']);
      var dst1_m = redUtil.jsonIntegerParse(io.moistureConfig_interval);
      
      dst["interval"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['threshold']);
      var dst2_m = redUtil.jsonIntegerParse(io.moistureConfig_threshold);
      
      dst["threshold"] = dst2 || dst2_m;
      
      return dst;
    }
    
    // call initialize moistureInit
    var arg0 = moistureConfigNew(config);
    console.log('init moisture' + JSON.stringify(arg0));
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
    
    redUtil.checkInit(io.moistureInit(arg0 ,arg1 ,arg2));
        
    // call moisture onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'moistureOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.moistureOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.moistureRelease(config);
    })
    
  }
  RED.nodes.registerType("moisture", moisture);
}
