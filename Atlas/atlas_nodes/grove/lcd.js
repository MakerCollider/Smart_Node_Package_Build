var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

var RedUtil = require('red-util');

module.exports = function(RED) {
  /**************************************************
                        lcd
   **************************************************/

  function lcd(param) {
    var config = param; 
    RED.nodes.createNode(this,config);
    var node = this;

    var redUtil = new RedUtil(node, config);
    
    // configure function
    function lcdConfigNew(src) {
      var dst = {};
      var dst0 = redUtil.jsonIntegerParse(src['colorr']);
      var dst0_m = redUtil.jsonIntegerParse(io.lcdConfig_colorr);
      
      dst["colorr"] = dst0 || dst0_m;
      var dst1 = redUtil.jsonIntegerParse(src['colorg']);
      var dst1_m = redUtil.jsonIntegerParse(io.lcdConfig_colorg);
      
      dst["colorg"] = dst1 || dst1_m;
      var dst2 = redUtil.jsonIntegerParse(src['colorb']);
      var dst2_m = redUtil.jsonIntegerParse(io.lcdConfig_colorb);
      
      dst["colorb"] = dst2 || dst2_m;
      
      return dst;
    }
    
    // call initialize lcdInit
    var arg0 = lcdConfigNew(config);
    console.log('init lcd' + JSON.stringify(arg0));
    var arg1 = function() {
      node.send([
        {'payload' : arguments[0]}
      ])
    }
    
    redUtil.checkInit(io.lcdInit(arg0 ,arg1));
        
    // call lcd onData function
    node.on('input', function(msg) {
      // Validate the msg 
      if(!redUtil.isValid(msg))
        return;
      
      // extract arguments from msg
      var args = redUtil.msgToArgs(msg);
      
      //if (!args.hasOwnProperty("0"))
        //throw Error("Input string should have '0' properties as the 1st parameter of function 'lcdOnData'.");
      var arg0 = redUtil.jsonStringArrayParse(args[0])
        
      var res = io.lcdOnData(arg0);
    });
        
    // call release function
    node.on('close', function() {
      io.lcdRelease(config);
    })
    
  }
  RED.nodes.registerType("lcd", lcd);
}
