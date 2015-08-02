module.exports = function(RED) {
    var groveSensor = require("jsupm_grove");
    function GroveTemp(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var is_on = false;
        var waiting;
        var temp = new groveSensor.GroveTemp(node.analogPin);                 
	    this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readtempvalue,node.interval);
                }
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    node.status({fill: "red", shape: "ring", text: "no signal"});
                    clearInterval(waiting);
                }
            }
        });
        this.on('close', function() {
            clearInterval(waiting);
        });	
    	function readtempvalue()
    	{
    		var celTemp = temp.value();
    		var msg = { payload:celTemp };
                node.status({fill: "red", shape: "dot", text: "Temprature is " + celTemp});
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("Temprature", GroveTemp);
}
