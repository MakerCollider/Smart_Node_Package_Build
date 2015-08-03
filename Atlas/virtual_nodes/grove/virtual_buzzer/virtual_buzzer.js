module.exports = function(RED) {
    function BuzzerVirtual(config) {
        RED.nodes.createNode(this, config);
       
        if(config.tone >= 7)
        {
            config.tone = 6;
        }
        //delay between emissions
        this.tone = config.tone;
        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;
        var v_signal;
        var is_on = false;
        var music = ["do", "re", "mi", "fa", "so", "la", "ti"];

        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    var textTemp = "Singing " + music[node.tone-1] + " now";
                    node.status({fill: "green", shape: "dot", text: textTemp});
                    node.send(msg);
                }
                
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    node.status({fill: "red", shape: "ring", text: "Slient"});
                    node.send(msg);
                }
            }
        });

        //clean up when re-deploying
        this.on('close', function() {
            //without this, old intervals aren't cleared and run forever
            is_on = false;
            node.status({fill: "red", shape: "ring", text: "Slient"});
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("Buzzer", BuzzerVirtual);
}
