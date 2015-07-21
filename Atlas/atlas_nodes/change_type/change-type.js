module.exports = function(RED) {
    function ChangeType(config) {
        RED.nodes.createNode(this, config);
        this.operation = config.operation;
        var node = this;

        this.on('input', function(msg) {
            //convert to type
            if (node.operation === "TO_STRING") {
                msg.payload = String(msg.payload);
            } else if (node.operation === "TO_NUMBER") {
                msg.payload = Number(msg.payload); 
                //print "Not a Number" instead of "NaN"
                if (isNaN(msg.payload)) {
                    msg.payload = "Not a Number";
                }
            }
            //send the result
            node.send(msg);
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("change-type", ChangeType);
}
