var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        servoLoop
   **************************************************/

  function servoLoop(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function servoLoopConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['maxAngle']);
      var dst0_m = redUtil.jsonIntegerParse(io.servoLoopConfig_maxAngle);
      
      dst["maxAngle"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['minAngle']);
      var dst1_m = redUtil.jsonIntegerParse(io.servoLoopConfig_minAngle);
      
      dst["minAngle"] = dst1 || dst1_m;
      
      return dst;
    }
    
    // call initialize servoLoopInit
    var arg0 = servoLoopConfigNew(config);
    console.log('init servoLoop' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.servoLoopInit(arg0 ,arg1));
        
    // call servoLoop onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'servoLoopOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.servoLoopOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.servoLoopRelease(config);
    })
    
  }
  RED.nodes.registerType("servoLoop", servoLoop);
}
