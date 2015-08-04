module.exports = function(RED) {
    //var johnny_five = require('johnny-five');
    //var edison = require('galileo-io');

    function Driving(config) {
        RED.nodes.createNode(this, config);
        this.direction = "STOP";
        this.speed = 255;
        var motor1, motor2, pwm, dir, cdir;
        var node = this;

        //Handle inputs
        node.on('input', function(msg) {
            //Timer - TODO this requires full object
            //skips the rest 
            if (msg.timer) {
                if (msg.direction === "FORWARD") {
                    node.status({fill: "green", shape: "dot", text: "Direction: " + msg.direction + ", Speed: " + msg.speed + ", Time: " + msg.timer});
                } else if (msg.direction === "REVERSE") {
                    node.status({fill: "green", shape: "dot", text: "Direction: " + msg.direction + ", Speed: " + msg.speed + ", Time: " + msg.timer});
                } else if (msg.direction === "LEFT") {
                    node.status({fill: "green", shape: "dot", text: "Direction: " + msg.direction + ", Speed: " + msg.speed + ", Time: " + msg.timer});
                } else if (msg.direction === "RIGHT") {
                    node.status({fill: "green", shape: "dot", text: "Direction: " + msg.direction + ", Speed: " + msg.speed + ", Time: " + msg.timer});
                }
            } 
        });

        node.on('close', function() {
            console.log("Closing node...");
        });
    }
    RED.nodes.registerType("Driving", Driving);
}
