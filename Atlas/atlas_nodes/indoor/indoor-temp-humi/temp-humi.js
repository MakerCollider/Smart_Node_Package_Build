module.exports = function(RED){ 
    var groveSensor = require("jsupm_th02");
    function GroveTempHumi(config) {
        RED.nodes.createNode(this, config);
        this.interval = config.interval;
        var node = this;
        var is_on = false;
        var waiting;
        var th02 = new groveSensor.TH02(0, 0x40);
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            var payload = msg.payload>>>0;
            console.log("recv msg: " + payload);
            if (payload) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readvalue,node.interval);
                }
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    node.status({fill: "red", shape: "ring", text: "no signal"});
                    clearInterval(waiting);
                }
            }
        });
        this.on('close', function() {
                clearInterval(waiting);
        });
    	function readvalue()
    	{
            var temperature = th02.getTemperature();
            var humidity = th02.getHumidity();
            node.status({fill: "red", shape: "dot", text: "temperature is " + temperature + ", humidity is " + humidity});
    		var msg = { payload:temperature };
            var msg1 = { payload:humidity };
    		node.send([msg, msg1]);
    	}
    }
    RED.nodes.registerType("TempHumi", GroveTempHumi);
}
