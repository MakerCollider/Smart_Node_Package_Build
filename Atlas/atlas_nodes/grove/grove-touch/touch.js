module.exports = function(RED) {
    var sensorModule = require('jsupm_ttp223');
    function GroveTouch(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        this.impulse = config.impulse;
        var node = this;
        var touchValue = null;
        node.digitalPin = node.digitalPin>>>0;
        var touch = new sensorModule.TTP223(node.digitalPin);                 
	var myinterval = setInterval(readTouchValue,100);
        this.on('close', function() {
                clearInterval(myinterval);
            onOffStatus = 0;                                          
                var msg = { payload:0 };                                  
                //send the result                                         
                node.status({fill: "red", shape: "ring", text: "turn off"});
                node.send(msg);
        });	
    var count = 0;
    var onOffStatus = 0;
    function buttonDelay(inputValue){                                                     
        if(inputValue == 0)                                                              
        {                                                                                
            count = 0;                                                                   
            return 0;                                                                    
        }                                                                                
        else if(inputValue == 1 )                                                        
        {                                                                                
            count ++ ;                                                                   
        }                                                                                
        if(count == (node.impulse/100))                                                                  
            return 1;                                                                    
        else                                                                             
            return 0;                                                                    
    }     
    function readTouchValue(){
	touchValue = touch.isPressed();
        //hard code the interval to 100ms, count the configed times to trigger the button
        var val = buttonDelay(touchValue);
        if(val == 1)                             
        { 
            if(onOffStatus == 0)                                                                   
            {                                                                                      
                onOffStatus = 1;                                                                   
                var msg = { payload:1 };         
                //send the result                         
                node.status({fill: "red", shape: "dot", text: "turn on"}); 
                node.send(msg);                                                                           
            }                                                                                      
            else                                                                                   
            {                                                                                      
                onOffStatus = 0;                                                                   
                var msg = { payload:0 };                                                 
                //send the result
                node.status({fill: "red", shape: "ring", text: "turn off"});                  
                node.send(msg);                                                                         
            }    
        }
    }
    }
    RED.nodes.registerType("Touch", GroveTouch);
}
