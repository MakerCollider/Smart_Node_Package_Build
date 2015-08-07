module.exports = function(RED) {
    function GroveLCDVirtual(config) {
        RED.nodes.createNode(this, config);
	    this.R=config.R;
        this.G=config.G;
        this.B=config.B;
        var node = this;
        node.R=node.R>>>0;
        node.G=node.G>>>0;
        node.B=node.B>>>0;
        node.status({fill: "green", shape: "dot", text: ""});
        this.on('input', function(msg){
            var inputStr = String(msg.payload);
            node.status({fill: "green", shape: "dot", text: inputStr});
        });
        this.on('close', function() {
            node.status({fill: "green", shape: "dot", text: ""});
        }); 
    }
    RED.nodes.registerType("Lcd", GroveLCDVirtual);
}
