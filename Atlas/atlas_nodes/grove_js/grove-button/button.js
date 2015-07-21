module.exports = function(RED) {
    var groveSensor = require("jsupm_grove");
    function GroveButton(config) {
        RED.nodes.createNode(this, config);
        this.dPin = config.dPin;
        this.impulse = config.impulse;
        var node = this;
        var buttonValue = null;
        node.dPin = node.dPin>>>0;
        var button = new groveSensor.GroveButton(node.dPin);                 
	var myinterval = setInterval(readButtonValue,100);
        this.on('close', function() {
                clearInterval(myinterval);
        });	
    var count;
    var lastStatus = 0;
    function readButtonValue(){
	buttonValue = button.value();
        if(1 == buttonValue){
            count++;
        }else {
            count = 0;
            if(lastStatus != 0)
            {                  
                var msg = { payload:0 };            
                //send the result                   
                node.send(msg);                        
                lastStatus = 0;
            }
        }
        if(count >= (config.impulse/100))
        {
            if(lastStatus != 1)
            {
                var msg = { payload:1 };            
                //send the result                   
                node.send(msg);                     
                lastStatus = 1;
            }
        }
    }
    }
    RED.nodes.registerType("Button", GroveButton);
}
