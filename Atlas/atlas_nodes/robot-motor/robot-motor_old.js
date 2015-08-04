module.exports = function(RED) {
    var johnny_five = require('johnny-five');
    var edison = require('galileo-io');

    function RobotMotor(config) {
        RED.nodes.createNode(this, config);
        this.direction = "STOP";
        this.speed = 255;
        this.pinset = config.pinset;
        var motor, pwm, dir, cdir;
        var node = this;
        var board = new johnny_five.Board({
            io: new edison()
        });

        if (node.pinset == 1) {
            pwm = "GP12";
            dir = "GP47";
            cdir = "GP48";
        } else {
            pwm = "GP13";
            dir = "GP44";
            cdir = "GP45";
        }

        board.on("ready", function() {
            //create motor object
            motor = new johnny_five.Motor({
                pins: {
                    pwm: pwm,
                    dir: dir,
                    cdir: cdir
                }
            });
            board.repl.inject({
                motor: node.motor
            });
            console.log("motor prepared");

            //called whenever direction changes            
            motor.on("start", function(err, timestamp) {
            });
           
            //Handle inputs
            node.on('input', function(msg) {
                //Speed
                if (msg.speed) {
                    msg.speed = Number(msg.speed);
                    if ((msg.speed < 256) && (msg.speed > -1)) {
                        node.speed = msg.speed;
                        if (node.direction === "CLOCKWISE") {
                            motor.forward(node.speed);
                        } else if (node.direction === "COUNTER") {
                            motor.reverse(node.speed);
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
                        motor.stop();
                        node.direction = "STOP";
                    }
                    //spin clockwise
                    else if (msg.direction === "CLOCKWISE") {
                        motor.forward(node.speed);
                        node.direction = "CLOCKWISE";
                    }
                    //spin counter-clockwise
                    else if (msg.direction === "COUNTER") {
                        motor.reverse(node.speed);
                        node.direction = "COUNTER";
                    }
                    //warn invalid input
                    else {
                        console.log("Warning: motor received invalid direction");
                    }
                }
            });

            node.on('close', function() {
                console.log("Closing node...");
            });

        });

    }
    RED.nodes.registerType("robot-motor", RobotMotor);
}
