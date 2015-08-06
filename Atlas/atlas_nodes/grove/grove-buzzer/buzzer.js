module.exports = function(RED){ 
    var upmBuzzer = require("jsupm_buzzer");
    function GroveBuzzer(config) {
        RED.nodes.createNode(this, config);
        this.pwmPin = config.pwmPin;
        this.tone = config.tone
        var node = this;
	    node.pwmPin = node.pwmPin>>>0;
        var myBuzzer = new upmBuzzer.Buzzer(node.pwmPin);
        this.on('input',function(msg) {
            console.log("msg:" + msg.payload);
        	if (msg.payload){
                var msg = { payload:1 };
            	node.send(msg);
            	console.log("tone:" + node.tone);
            	if (node.tone == 1)
                        myBuzzer.playSound(upmBuzzer.DO, 1000000);
            	if (node.tone == 2)
                        myBuzzer.playSound(upmBuzzer.RE, 1000000);
            	if (node.tone == 3)
                        myBuzzer.playSound(upmBuzzer.MI, 1000000);
            	if (node.tone == 4)
                        myBuzzer.playSound(upmBuzzer.FA, 1000000);
            	if (node.tone == 5)
                        myBuzzer.playSound(upmBuzzer.SOL, 1000000);
            	if (node.tone == 6)
                        myBuzzer.playSound(upmBuzzer.LA, 1000000);
            	if (node.tone == 7)
                        myBuzzer.playSound(upmBuzzer.DO, 1000000);
            	if (node.tone > 7 || node.tone < 1)
                        myBuzzer.playSound(upmBuzzer.DO, 1000000);
        	}
            else {
                var msg = { payload:0 };
                node.send(msg);
        	}
        });
        this.on('close', function() {
        });
    }
    RED.nodes.registerType("Buzzer", GroveBuzzer);
}
