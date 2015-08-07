module.exports = function(RED) {
    function SayVirtual(config) {
        RED.nodes.createNode(this, config);
	    this.name=config.name;
        var node = this;
        node.status({fill: "green", shape: "dot", text: ""});
        this.on('input', function(msg){
            if(node.name)
            {
                node.status({fill: "green", shape: "dot", text: "Speaking: " + node.name});
                var tempStr = node.name;
            }
            else
            {
                node.status({fill: "green", shape: "dot", text: "Speaking: " + msg.payload});
                var tempStr = String(msg.payload);
            }
            var msg = {payload: tempStr};
            node.send(msg);
            
        });
        this.on('close', function() {
            node.status({fill: "red", shape: "ring", text: "Slient!"});
        }); 
    }
    RED.nodes.registerType("Say", SayVirtual);
}
