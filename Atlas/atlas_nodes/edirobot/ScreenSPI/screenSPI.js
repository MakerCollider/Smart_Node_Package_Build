module.exports = function(RED) {

    var jslib = require('jsupm_screenSpi9225');
    var exec = require('child_process').exec; 

    function ScreenSPI(config) {
        console.log("SPI 9225 Screen initalizing.......");
        RED.nodes.createNode(this, config);
	var node = this;

        var cmd = "echo on > /sys/devices/pci0000\:00/0000\:00\:07.1/power/control";
        exec(cmd, function(err,stdout,stderr) {
            if(err) {
                console.log("enable power control error:"+stderr);
            } else {
                console.log("enable power control ok");
            }
        }); 
    
        var screen = new jslib.ScreenSpi9225(12,18,19);
        screen.ILI9225GclearScreen(0x0000); 
        this.status({fill:"blue",shape:"dot",text:"Initalized"});
        
        //Handle inputs
        this.on('input', function(msg) {
            if(msg.payload == 1) {
                screen.ILI9225GclearScreen(0x0000);
                screen.ILI9225GfillRect(0);
                this.status({fill:"blue",shape:"dot",text:"showing"});
            } else {
                screen.ILI9225GclearScreen(0x0000);
                this.status({fill:"red",shape:"ring",text:"clear"});
            }
        });

        this.on('close', function() {
            console.log("Stop Screen");
            screen.ILI9225GclearScreen(0x0000); 
            delete screen; 
            this.status({fill:"red",shape:"ring",text:"closed"});
        });
    }
    RED.nodes.registerType("ScreenSPI", ScreenSPI);
}

