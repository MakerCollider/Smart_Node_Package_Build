var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        motor
   **************************************************/

  function motor(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function motorConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['motorId']);
      var dst0_m = redUtil.jsonIntegerParse(io.motorConfig_motorId);
      
      dst["motorId"] = dst0 || dst0_m;
      
      return dst;
    }
    
    // call initialize motorInit
    var arg0 = motorConfigNew(config);
    console.log('init motor' + JSON.stringify(arg0));
    
    redUtil.checkInit(io.motorInit(arg0));
        
    // call motor onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'motorOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.motorOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.motorRelease(config);
    })
    
  }
  RED.nodes.registerType("motor", motor);
}
