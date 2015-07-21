module.exports = function(RED) {
    function MathOperations(config) {
        RED.nodes.createNode(this, config);
        this.operation = config.operation;
        this.input_type = config.input_type;
        this.value = config.value;
        var node = this;
        var output;
        var input_value;

        this.on('input', function(msg) {
            input_value = node.value;
            //operations 
            if (node.operation === "ADD") {
                output = Number(msg.payload) + Number(input_value);
            } else if (node.operation === "SUBTRACT") {
                output = Number(msg.payload) - Number(input_value); 
            } else if (node.operation === "MULTIPLY") {
                output = Number(msg.payload) * Number(input_value);
            } else if (node.operation === "DIVIDE") {
                output = Number(msg.payload) / Number(input_value);
            }
            //send the result
            msg = {payload: output};
            node.send(msg);
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("Math", MathOperations);
}
