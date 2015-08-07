module.exports = function(RED){ 
    function GroveRelayVirtual(config) {
        RED.nodes.createNode(this, config);
        this.digitalPin = config.digitalPin;
        var node = this;
        node.digitalPin = node.digitalPin>>>0;
        var is_on = false;
        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            var payload = msg.payload>>>0;
            console.log("recv msg: " + payload);
            if (payload) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    node.status({fill: "green", shape: "dot", text: "Relay turn on"});
                }
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    node.status({fill: "red", shape: "ring", text: "Relay turn off"});
                }
            }
        });
        this.on('close', function() {
            node.status({fill: "red", shape: "ring", text: "Relay turn off"});
        });
    }
    RED.nodes.registerType("Relay", GroveRelayVirtual);
}
