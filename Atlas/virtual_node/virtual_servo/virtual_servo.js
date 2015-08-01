module.exports = function(RED) {
    function ServoVirtual(config) {
        RED.nodes.createNode(this, config);
       
        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;
        var v_signal;

        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            node.status({fill: "red", shape: "dot", text: "move to " + msg.payload});
            node.send(msg);
        });

        //clean up when re-deploying
        this.on('close', function() {
            //without this, old intervals aren't cleared and run forever
            is_on = false;
            node.status({fill: "red", shape: "ring", text: "move to 0"});
            node.send(msg);
        });
    }
    
    RED.nodes.registerType("Servo", ServoVirtual);
}
