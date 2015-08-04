module.exports = function(RED) {

    function RobotMotor(config) {
        RED.nodes.createNode(this, config);
        this.direction = "STOP";
        this.speed = 255;
        this.pinset = config.pinset;
        var motor, pwm, dir, cdir;
        var node = this;

        if (node.pinset == 1) {
            pwm = "6";
            dir = "7";
        } else {
            pwm = "5";
            dir = "4";
        }
           
        //Handle inputs
        node.on('input', function(msg) {
            //Timer - TODO this requires full object
            //skips the rest 
            node.status({fill: "green", shape: "dot", text: "Direction: " + msg.direction + ", Speed: " + msg.speed + ", Time: " + msg.timer});       
        });

        node.on('close', function() {
            console.log("Closing node...");
        });
    }
    RED.nodes.registerType("Motor", RobotMotor);
}
