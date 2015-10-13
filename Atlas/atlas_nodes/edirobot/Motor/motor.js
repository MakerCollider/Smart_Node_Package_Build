module.exports = function(RED) {

    var jslib = require('jsupm_ojl298');

    function Motor(config) {
        this.log("motors initalizing.......");
        RED.nodes.createNode(this, config);
        this.pwm = Number(config.pwm);
        this.dir = Number(config.dir);

        var motor = new jslib.OJL298(this.pwm, this.dir);
        motor.speed = Number(config.speed);
        motor.timeout = Number(config.timeout);

        this.log("motors prepared.");
        this.log("Motor pwm : " + this.pwm);
        this.log("Motor dir : " + this.dir);
        this.log("Default speed : " + config.speed);
        this.log("Default timeout : " + config.timeout);
        this.status({fill:"blue",shape:"dot",text:"Initalized"});

        //Handle inputs
        this.on('input', function(msg) {
            if(msg.timeout)
            {
                motor.timeout = Number(msg.timeout);
            }

            if(msg.speed)
            {
                motor.speed = Number(msg.speed);
            }

            if(msg.direction)
            {
                //Counter-Clockwise:0, Clockwise:1, Stop:2
                motor.direction = Number(msg.direction);
            }

            motor.setMotion();
            this.status({fill:"green",shape:"dot",text:"Running"});
            this.log("Action: Speed " + motor.speed + " Direction " + motor.direction);
        });

        this.on('close', function() {
            this.log("Stop Motor");
            motor.stop();
        });
    }
    RED.nodes.registerType("Motor", Motor);
}
