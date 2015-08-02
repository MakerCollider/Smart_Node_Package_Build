module.exports = function(RED){ 
    var grove_motion = require('jsupm_biss0001');
    function GroveMotion(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        this.interval = config.interval;
        var node = this;
        node.digitalPin = node.digitalPin>>>0;
        var is_on = false;
    	var myMotionObj = new grove_motion.BISS0001(node.digitalPin);
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    var waiting = setInterval(readMotionValue,node.interval);
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
    	function readMotionValue()
    	{
    		var motionValue = myMotionObj.value();
                node.status({fill: "red", shape: "dot", text: "Motion value is " + motionValue});
    		var msg = { payload:motionValue };
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("Motion", GroveMotion);
}
