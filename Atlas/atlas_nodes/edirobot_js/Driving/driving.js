module.exports = function(RED) {
    var johnny_five = require('johnny-five');
    var edison = require('galileo-io');

    function Driving(config) {
        RED.nodes.createNode(this, config);
        this.direction = "STOP";
        this.speed = 255;
        var motor1, motor2, pwm, dir, cdir;
        var node = this;
        var board = new johnny_five.Board({
            io: new edison(),
            repl: false
        });

        board.on("ready", function() {
            //create motor objects
            motor1 = new johnny_five.Motor({
                pins: {
                    pwm: 6,
                    dir: 7,
                }
            });
            motor2 = new johnny_five.Motor({
                pins: {
                    pwm: 5,
                    dir: 4,
                }
            });
            console.log("motors prepared");

            //Handle inputs
            node.on('input', function(msg) {
                //Timer - TODO this requires full object
                //skips the rest 
                if (msg.timer) {
                    if (msg.direction === "FORWARD") {
                        motor1.forward(msg.speed);
                        motor2.forward(msg.speed);
                        board.wait(msg.timer, function() {
                            motor1.stop();
                            motor2.stop();
                        });
                    } else if (msg.direction === "REVERSE") {
                        motor1.reverse(msg.speed);
                        motor2.reverse(msg.speed);
                        board.wait(msg.timer, function() {
                            motor1.stop();
                            motor2.stop();
                        });
                    } else if (msg.direction === "LEFT") {
                        motor1.forward(msg.speed);
                        motor2.reverse(msg.speed);
                        board.wait(msg.timer, function() {
                            motor1.stop();
                            motor2.stop();
                        });
                    } else if (msg.direction === "RIGHT") {
                        motor1.reverse(msg.speed);
                        motor2.forward(msg.speed);
                        board.wait(msg.timer, function() {
                            motor1.stop();
                            motor2.stop();
                        });
                    }
                } else {
                //Speed
                if (msg.speed) {
                    msg.speed = Number(msg.speed);
                    if ((msg.speed < 256) && (msg.speed > -1)) {
                        node.speed = msg.speed;
                        if (node.direction === "FORWARD") {
                            motor1.forward(node.speed);
                            motor2.forward(node.speed);
                        } else if (node.direction === "REVERSE") {
                            motor1.reverse(node.speed);
                            motor2.reverse(node.speed);
                        } else if (node.direction === "LEFT") {
                            motor1.forward(node.speed);
                            motor2.reverse(node.speed);
                        } else if (node.direction === "RIGHT") {
                            motor1.reverse(node.speed);
                            motor2.reverse(node.speed);
                        }
                    }
                    //warn if invalid speed
                    else {
                        console.log("Warning: motor received invalid speed");
                    }
                }

                //Direction
                //stop motor
                if (msg.direction) { 
                    if (msg.direction === "STOP") {
                        motor1.stop();
                        motor2.stop();
                        node.direction = "STOP";
                    }
                    //spin clockwise
                    else if (msg.direction === "FORWARD") {
                        motor1.forward(node.speed);
                        motor2.forward(node.speed);
                        node.direction = "FORWARD";
                    }
                    //spin counter-clockwise
                    else if (msg.direction === "REVERSE") {
                        motor1.reverse(node.speed);
                        motor2.reverse(node.speed);
                        node.direction = "REVERSE";
                    }
                    //left
                    else if (msg.direction === "LEFT") {
                        motor1.forward(node.speed);
                        motor2.reverse(node.speed);
                        node.direction = "LEFT";
                    }
                    //right
                    else if (msg.direction === "RIGHT") {
                        motor1.reverse(node.speed);
                        motor2.forward(node.speed);
                        node.direction = "RIGHT";
                    }
                    //warn invalid input
                    else {
                        console.log("Warning: motor received invalid direction");
                    }
                }
                }
            });

            node.on('close', function() {
                console.log("Closing node...");
            });

        });

    }
    RED.nodes.registerType("Driving", Driving);
}
