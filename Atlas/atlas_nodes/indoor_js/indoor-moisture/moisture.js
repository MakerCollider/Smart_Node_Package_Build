module.exports = function(RED) {
    var groveSensor = require("jsupm_grovemoisture");
    function GroveMoisture(config) {
        RED.nodes.createNode(this, config);
        this.analogPin = config.analogPin;
        this.interval = config.interval;
        var node = this;
        node.analogPin = node.analogPin>>>0;
        var moisture = new groveSensor.GroveMoisture(node.analogPin); 
        var waiting;  
        this.on('input', function(msg){
            if (msg.payload==1)
            {
                waiting = setInterval(readmoisturevalue,node.interval);
            }           
            else if (msg.payload==0)
            {
                clearInterval(waiting);
                node.status({fill: "green", shape: "ring", text: "turn off"});
            }
        });               

        this.on('close', function() {
            clearInterval(waiting);
            node.status({fill: "green", shape: "ring", text: "turn off"});
        });	

	function readmoisturevalue()
	{
		var celMoisture = moisture.value();
		var msg={payload:celMoisture};
        node.status({fill: "green", shape: "dot", text: "Get Moisture value: " + celMoisture});
		node.send(msg);
	}
    }
    RED.nodes.registerType("Moisture", GroveMoisture);
}
