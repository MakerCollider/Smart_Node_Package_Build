var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        screen
   **************************************************/

  function screen(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function screenConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['refreshFreq']);
      var dst0_m = redUtil.jsonIntegerParse(io.screenConfig_refreshFreq);
      
      dst["refreshFreq"] = dst0 || dst0_m;
      
      return dst;
    }
    
    // call initialize screenInit
    var arg0 = screenConfigNew(config);
    console.log('init screen' + JSON.stringify(arg0));
    
    redUtil.checkInit(io.screenInit(arg0));
        
    // call screen onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'screenOnData'.");
      var arg0 = redUtil.jsonIntegerParse(args[0]);
        
      var res = io.screenOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.screenRelease(config);
    })
    
  }
  RED.nodes.registerType("screen", screen);
}
