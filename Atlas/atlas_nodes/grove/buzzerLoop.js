var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        buzzerLoop
   **************************************************/

  function buzzerLoop(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function buzzerLoopConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pin']);
      var dst0_m = redUtil.jsonIntegerParse(io.buzzerLoopConfig_pin);
      
      dst["pin"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['tone']);
      var dst1_m = redUtil.jsonIntegerParse(io.buzzerLoopConfig_tone);
      
      dst["tone"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['interval']);
      var dst2_m = redUtil.jsonIntegerParse(io.buzzerLoopConfig_interval);
      
      dst["interval"] = dst2 || dst2_m;
      
      return dst;
    }
    
    // call initialize buzzerLoopInit
    var arg0 = buzzerLoopConfigNew(config);
    console.log('init buzzerLoop' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.buzzerLoopInit(arg0 ,arg1));
        
    // call buzzerLoop onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'buzzerLoopOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.buzzerLoopOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.buzzerLoopRelease(config);
    })
    
  }
  RED.nodes.registerType("buzzerLoop", buzzerLoop);
}
