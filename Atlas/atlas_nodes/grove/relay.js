var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        relay
   **************************************************/

  function relay(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function relayConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pin']);
      var dst0_m = redUtil.jsonIntegerParse(io.relayConfig_pin);
      
      dst["pin"] = dst0 || dst0_m;
      
      return dst;
    }
    
    // call initialize relayInit
    var arg0 = relayConfigNew(config);
    console.log('init relay' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.relayInit(arg0 ,arg1));
        
    // call relay onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'relayOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.relayOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.relayRelease(config);
    })
    
  }
  RED.nodes.registerType("relay", relay);
}
