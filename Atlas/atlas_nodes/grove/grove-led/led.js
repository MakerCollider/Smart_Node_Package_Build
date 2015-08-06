module.exports = function(RED) {
    var groveSensor = require("jsupm_grove");
    function LED(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        var node = this;
        
	   var myinterval=null;

        node.digitalPin = node.digitalPin>>>0;
        var led = new groveSensor.GroveLed(node.digitalPin);  
        console.log("Init LED on digital pin "+ node.digitalPin);
		this.on('input', function(msg){
			if (msg.payload==1)
			{
                                console.log("LED ON");
				led.on();
			}			
			else if (msg.payload==0)
			{
                                console.log("LED OFF");
				led.off();
			}
		});	
		
        this.on('close', function() {
            led.off();
        });	
   
    }


    RED.nodes.registerType("Led", LED);
}