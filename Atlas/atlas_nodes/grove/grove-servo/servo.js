module.exports = function(RED) {
var servoModule =require("jsupm_servo");
    function GroveServo(config) {
        RED.nodes.createNode(this, config);
        this.pwmPin = config.pwmPin;
        var node = this;
        node.pwmPin = node.pwmPin>>>0;
        var servo = null;
        var angle = null;
        //pwmPin
        if(servo == null){
            if (node.pwmPin) {
                servo = new servoModule.ES08A(node.pwmPin);
                console.log("pin: " + node.pwmPin);
            } else {
                servo = new servoModule.ES08A(3);      
                console.log("defaulting to pin 3");
            }
        }
        this.on('input', function(msg) {
            console.log("input!");
            angle = msg.payload;
            angle = angle>>>0;
            
            servo.setAngle(angle);
            node.status({fill: "red", shape: "dot", text: "Servo move to " + angle});
            console.log("Set Angle to " + angle);

            //send the result
            var msg1 = { payload:angle };
            node.send(msg1);
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    } 
  
    RED.nodes.registerType("Servo", GroveServo);
}
