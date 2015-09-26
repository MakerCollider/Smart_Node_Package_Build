module.exports = function(RED) {

    var mraa = require('mraa');

    function edisonSerial(config) {
        this.log("Edison serial initalizing.......");
        RED.nodes.createNode(this, config);

        this.serialport = config.serialport;
        this.serialbaud = parseInt(config.serialbaud);
        this.databits = parseInt(config.databits);
        this.parity = config.parity;
        this.stopbits = parseInt(config.stopbits);

        this.log("Port : " + config.serialport);
        this.log("Baud : " + this.serialbaud);
        this.log("Databits : " + this.databits);
        this.log("Parity : " + this.parity);
        this.log("Stopbits : " + this.stopbits);

        var serial = new mraa.Uart(this.serialport);
        serial.setBaudRate(this.serialbaud);
        serial.setMode(this.databits, this.parity, this.stopbits);

        this.log("Port : " + this.serialport);
        this.log("Baud : " + this.serialbaud);
        this.log("Databits : " + this.databits);
        this.log("Parity : " + this.parity);
        this.log("Stopbits : " + this.stopbits);
        this.log("Serial prepared.");
        this.status({fill:"blue",shape:"dot",text:"Initalized"});

        //Handle inputs
        this.on('input', function(msg) {
            this.status({fill:"blue",shape:"dot",text:"Sending"});

            serial.writeStr(msg.payload);

            this.status({fill:"green",shape:"dot",text:"OK"});
            this.log("Send Message: " + msg.payload);
        });

        this.on('close', function() {
	    delete serial;
            this.log("Stop Serial");
        });
    }
    RED.nodes.registerType("edisonSerial", edisonSerial);
}
