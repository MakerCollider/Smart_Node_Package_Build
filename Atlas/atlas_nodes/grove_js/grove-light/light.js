module.exports = function(RED){ 
    var groveSensor = require("jsupm_grove");
    function GroveLight(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var is_on = false;
        var waiting;
        var light = new groveSensor.GroveLight(node.analogPin);
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            var payload = msg.payload>>>0;
            console.log("recv msg: " + payload);
            if (payload) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readlightvalue,node.interval);
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
    	function readlightvalue()
    	{
    		var celLight = light.value();
                node.status({fill: "red", shape: "dot", text: "light value is " + celLight + " lux"});
                console.log("light value is " + celLight);
    		var msg = { payload:celLight };
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("LightSensor", GroveLight);
}
