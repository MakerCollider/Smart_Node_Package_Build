module.exports = function(RED) {
    function ChangeSign(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function(msg) {
            if (!isNaN(msg.payload)) {
                msg.payload *= -1;
                node.send(msg);
            }
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("change-sign", ChangeSign);
}
