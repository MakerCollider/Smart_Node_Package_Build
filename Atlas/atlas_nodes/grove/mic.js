var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        mic
   **************************************************/

  function mic(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function micConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['aioPin']);
      var dst0_m = redUtil.jsonIntegerParse(io.micConfig_aioPin);
      
      dst["aioPin"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['threshold']);
      var dst1_m = redUtil.jsonIntegerParse(io.micConfig_threshold);
      
      dst["threshold"] = dst1 || dst1_m;
      
      return dst;
    }
    
    // call initialize micInit
    var arg0 = micConfigNew(config);
    console.log('init mic' + JSON.stringify(arg0));
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
    
    redUtil.checkInit(io.micInit(arg0 ,arg1 ,arg2));
        
    // call mic onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'micOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.micOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.micRelease(config);
    })
    
  }
  RED.nodes.registerType("mic", mic);
}
