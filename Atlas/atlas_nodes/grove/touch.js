var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        touch
   **************************************************/

  function touch(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function touchConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['pin']);
      var dst0_m = redUtil.jsonIntegerParse(io.touchConfig_pin);
      
      dst["pin"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['impulse']);
      var dst1_m = redUtil.jsonIntegerParse(io.touchConfig_impulse);
      
      dst["impulse"] = dst1 || dst1_m;
      
      return dst;
    }
    
    // call initialize touchInit
    var arg0 = touchConfigNew(config);
    console.log('init touch' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.touchInit(arg0 ,arg1));
        
    // call touch onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
        
      var res = io.touchOnData();
    });
        
    // call release function
    node.on('close', function() {
      io.touchRelease(config);
    })
    
  }
  RED.nodes.registerType("touch", touch);
}
