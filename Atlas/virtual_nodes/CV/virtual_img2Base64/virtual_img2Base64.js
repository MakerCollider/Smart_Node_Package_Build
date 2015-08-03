module.exports = function(RED) {
    function Img2Base64Virtual(config) {
        RED.nodes.createNode(this, config);
       
        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;

        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            msg = {payload: "b64ab4bab3f3612c788d22f432d6767b64ab4bab3f3612c788d22f432d6767b64ab4bab3f3612c788d22f432d6767b64ab4bab3f3612c788d22f432d6767"};
            node.status({fill: "red", shape: "dot", text: "Encoding the picture!"});
            node.send(msg);
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("Img2Base64", Img2Base64Virtual);
}
