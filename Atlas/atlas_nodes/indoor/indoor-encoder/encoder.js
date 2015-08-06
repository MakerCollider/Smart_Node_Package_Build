module.exports = function(RED){ 
    var groveSensor = require("jsupm_rotaryencoder");
    function GroveEncoder(config) {
        RED.nodes.createNode(this, config);
        this.digitalPinA = config.digitalPinA;
        this.digitalPinB = config.digitalPinB;
        this.interval = config.interval;
        var node = this;
        node.digitalPinA = node.digitalPinA>>>0;
        node.digitalPinB = node.digitalPinB>>>0;
        var is_on = false;
        var waiting;
        var encoder = new groveSensor.RotaryEncoder(node.digitalPinA,node.digitalPinB);
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            var payload = msg.payload>>>0;
            console.log("recv msg: " + payload);
            if (payload) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    waiting = setInterval(readencodervalue,node.interval);
                }
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    node.status({fill: "red", shape: "ring", text: "no signal"});
                    clearInterval(waiting);
                    encoder.initPosition();
                }
            }
        });
        this.on('close', function() {
            node.status({fill: "red", shape: "ring", text: "no signal"});
            clearInterval(waiting);
        });
        function readencodervalue()
        {
            var position = encoder.position();
            node.status({fill: "red", shape: "dot", text: "position value is " + position});
            var msg = { payload:position };
            node.send(msg);
        }
    }
    RED.nodes.registerType("Encoder", GroveEncoder);
}
