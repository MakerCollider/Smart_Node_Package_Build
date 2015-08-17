module.exports = function(RED) {

    var jslib = require('jsupm_ojl298');

    function Motor(config) {
        this.log("motors initalizing.......");
        RED.nodes.createNode(this, config);
        this.speed = config.speed >>> 0;
        this.pwm = config.pwm >>> 0;
        this.dir = config.dir >>> 0;
	this.timeout = config.timeout >>> 0;
	this.log("Default speed : " + this.speed);
	this.log("Default pwm : " + this.pwm);
	this.log("Default dir : " + this.dir);
	this.log("Default timeout : " + this.timeout);
        
	var motor;
        var node = this;
        motor = new jslib.OJL298(this.pwm, this.dir);
	motor.timeout = this.timeout;
        this.log("motors prepared.");
        this.status({fill:"blue",shape:"dot",text:"initalized"});

        //Handle inputs
        node.on('input', function(msg) {
	    if(msg.timeout)
	    {
		motor.timeout = msg.timeout >>> 0;
	    }

            if(msg.speed)
            {
                this.speed = msg.speed >>> 0;
            }
            motor.setSpeed(this.speed);
            
            if(msg.direction)
            {
                this.direction = msg.direction >>> 0;
                switch (this.direction)
                {
                case 1:
                    motor.setDirection(jslib.OJL298.DIR_CW);
                    this.status({fill:"green",shape:"dot",text:"Clockwise"});
                    break;
                case 2:
                    motor.setDirection(jslib.OJL298.DIR_CCW);
                    this.status({fill:"green",shape:"dot",text:"C-Clockwise"});
                    break;
        		case 3:
        		    motor.setStop();
        		    this.status({fill:"red",shape:"dot",text:"Stop"});
        		    break;
                }
            }
	    this.log("Action: Speed " + this.speed + " Direction " + this.direction);
        });

        node.on('close', function() {
            this.log("Stop Motor");
            motor.setStop();
        });
    }
    RED.nodes.registerType("Motor", Motor);
}
