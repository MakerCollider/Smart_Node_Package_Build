module.exports = function(RED) {
    function LEDVirtual(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        var node = this;
        node.digitalPin = node.digitalPin>>>0;
        console.log("Init LED on digital pin "+ node.digitalPin);
		this.on('input', function(msg){
			if (msg.payload==1)
			{
                console.log("LED ON");
				node.status({fill: "green", shape: "dot", text: "Led on"});
			}			
			else if (msg.payload==0)
			{
                console.log("LED OFF");
				node.status({fill: "red", shape: "ring", text: "Led off"});
			}
		});	
		
        this.on('close', function() {
            node.status({fill: "red", shape: "ring", text: "Led off"});
        });	
    }
    RED.nodes.registerType("Led", LEDVirtual);
}