var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        motion
   **************************************************/

  function motion(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function motionConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pin']);
      var dst0_m = redUtil.jsonIntegerParse(io.motionConfig_pin);
      
      dst["pin"] = dst0 || dst0_m;
      
      return dst;
    }
    
    // call initialize motionInit
    var arg0 = motionConfigNew(config);
    console.log('init motion' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.motionInit(arg0 ,arg1));
        
    // call motion onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'motionOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.motionOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.motionRelease(config);
    })
    
  }
  RED.nodes.registerType("motion", motion);
}
