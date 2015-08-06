module.exports = function(RED) {
    var groveSensor = require("jsupm_grove");
    function GroveButton(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        this.impulse = config.impulse;
        var node = this;
        var buttonValue = null;
        node.digitalPin = node.digitalPin>>>0;
        var button = new groveSensor.GroveButton(node.digitalPin);                 
	var myinterval = setInterval(readButtonValue,100);
        this.on('close', function() {
                clearInterval(myinterval);
            onOffStatus = 0;                                          
                var msg = { payload:0 };                                  
                //send the result                                         
                node.status({fill: "red", shape: "ring", text: "turn off"});
                node.send(msg);
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
                node.status({fill: "red", shape: "ring", text: "turn off"});                 
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
                node.status({fill: "red", shape: "dot", text: "turn on"}); 
                node.send(msg);                     
                lastStatus = 1;
            }
        }
    }
    }
    RED.nodes.registerType("Button", GroveButton);
}
