module.exports = function(RED) {
    function AddStrings(config) {
        RED.nodes.createNode(this, config);
        this.prepend = config.prepend;
        this.append = config.append;
        var node = this;

        this.on('input', function(msg) {
            //prepend
            if (node.prepend) {
                msg.payload = String(node.prepend + msg.payload);
            }
            //append
            if (node.append) {
                msg.payload = String(msg.payload + node.append);
            }
            //send the result
            node.send(msg);
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("add-strings", AddStrings);
}
