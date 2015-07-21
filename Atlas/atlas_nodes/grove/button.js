var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        button
   **************************************************/

  function button(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function buttonConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pin']);
      var dst0_m = redUtil.jsonIntegerParse(io.buttonConfig_pin);
      
      dst["pin"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['impulse']);
      var dst1_m = redUtil.jsonIntegerParse(io.buttonConfig_impulse);
      
      dst["impulse"] = dst1 || dst1_m;
      
      return dst;
    }
    
    // call initialize buttonInit
    var arg0 = buttonConfigNew(config);
    console.log('init button' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.buttonInit(arg0 ,arg1));
        
    // call button onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
        
      var res = io.buttonOnData();
    });
        
    // call release function
    node.on('close', function() {
      io.buttonRelease(config);
    })
    
  }
  RED.nodes.registerType("button", button);
}
