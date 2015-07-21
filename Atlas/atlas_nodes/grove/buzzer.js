var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        buzzer
   **************************************************/

  function buzzer(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function buzzerConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pin']);
      var dst0_m = redUtil.jsonIntegerParse(io.buzzerConfig_pin);
      
      dst["pin"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['tone']);
      var dst1_m = redUtil.jsonIntegerParse(io.buzzerConfig_tone);
      
      dst["tone"] = dst1 || dst1_m;
      
      return dst;
    }
    
    // call initialize buzzerInit
    var arg0 = buzzerConfigNew(config);
    console.log('init buzzer' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.buzzerInit(arg0 ,arg1));
        
    // call buzzer onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'buzzerOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.buzzerOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.buzzerRelease(config);
    })
    
  }
  RED.nodes.registerType("buzzer", buzzer);
}
