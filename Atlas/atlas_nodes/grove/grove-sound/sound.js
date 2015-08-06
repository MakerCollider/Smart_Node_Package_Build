module.exports = function(RED){ 
    var groveSensor = require("jsupm_groveloudness");
    function GroveSound(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var is_on = false;
        var waiting;
        var sound = new groveSensor.GroveLoudness(node.analogPin);
	    this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readsoundvalue,node.interval);
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
    	function readsoundvalue()
    	{
    		var celSound = sound.value();
    		var msg = { payload:celSound };
                node.status({fill: "red", shape: "dot", text: "Sound value is " + celSound});
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("SoundSensor", GroveSound);
}
