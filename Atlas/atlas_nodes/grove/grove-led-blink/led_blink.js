module.exports = function(RED) {
    var groveSensor = require("jsupm_grove");
    function LEDBlink(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        this.interval = config.interval;
        var node = this;
        
	   var myinterval=null;
        var is_on = false;
        node.digitalPin = node.digitalPin>>>0;
        var led = new groveSensor.GroveLed(node.digitalPin);  

		this.on('input', function(msg){
			if (msg.payload==1)
			{
                        if(is_on == false)
                        {
                        is_on = true;
			var i = 0;
			myinterval = setInterval(function() {
				if (i%2 == 0){
					led.on();
				}else{
					led.off();
				}
				i++;
			},node.interval);
                        }			
			}
			else if (msg.payload==0)
			{
                        if(is_on == true)
                        {
                            is_on = false;
				clearInterval(myinterval);
                                led.off(); 
                        }
			}
		});	
		
        this.on('close', function() {
                clearInterval(myinterval);
        });	
   
    }


    RED.nodes.registerType("LedBlink", LEDBlink);
}