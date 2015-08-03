module.exports = function(RED) {
    function DispImgVirtual(config) {
        RED.nodes.createNode(this, config);
       
        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;

        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            node.status({fill: "green", shape: "dot", text: "display image in a new tab"});
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("DispImg", DispImgVirtual);
}
