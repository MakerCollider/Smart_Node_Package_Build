var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        tempHumi
   **************************************************/

  function tempHumi(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function tempHumiConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['interval']);
      var dst0_m = redUtil.jsonIntegerParse(io.tempHumiConfig_interval);
      
      dst["interval"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['temperatureThreshold']);
      var dst1_m = redUtil.jsonIntegerParse(io.tempHumiConfig_temperatureThreshold);
      
      dst["temperatureThreshold"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['humidityThreshold']);
      var dst2_m = redUtil.jsonIntegerParse(io.tempHumiConfig_humidityThreshold);
      
      dst["humidityThreshold"] = dst2 || dst2_m;
      
      return dst;
    }
    
    // call initialize tempHumiInit
    var arg0 = tempHumiConfigNew(config);
    console.log('init tempHumi' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}, null, null, null, null, null
      ])
    }
    var arg2 = function() {
      node.send([
        null, {'payload' : arguments[0]}, null, null, null, null
      ])
    }
    var arg3 = function() {
      node.send([
        null, null, {'payload' : arguments[0]}, null, null, null
      ])
    }
    var arg4 = function() {
      node.send([
        null, null, null, {'payload' : arguments[0]}, null, null
      ])
    }
    var arg5 = function() {
      node.send([
        null, null, null, null, {'payload' : arguments[0]}, null
      ])
    }
    var arg6 = function() {
      node.send([
        null, null, null, null, null, {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.tempHumiInit(arg0 ,arg1 ,arg2 ,arg3 ,arg4 ,arg5 ,arg6));
        
    // call tempHumi onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'tempHumiOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.tempHumiOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.tempHumiRelease(config);
    })
    
  }
  RED.nodes.registerType("tempHumi", tempHumi);
}
