module.exports = function(RED){ 
    function GroveRotaryVirtual(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var is_on = false;
        var waiting;
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            var payload = msg.payload>>>0;
            console.log("recv msg: " + payload);
            if (payload) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readrotaryvalue,node.interval);
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
                node.status({fill: "red", shape: "ring", text: "no signal"});
        });
    	function readrotaryvalue()
    	{
            var absdeg = Math.floor(Math.random()*300);
            node.status({fill: "green", shape: "dot", text: "Rotary value is " + absdeg + " degree."});
            console.log("Rotary value is " + absdeg);
    		var msg = { payload:absdeg };
    		node.send(msg);
    	}
    }
    RED.nodes.registerType("Rotary", GroveRotaryVirtual);
}
