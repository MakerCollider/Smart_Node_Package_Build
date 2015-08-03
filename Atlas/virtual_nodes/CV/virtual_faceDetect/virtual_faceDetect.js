module.exports = function(RED) {
    function FaceDetectVirtual(config) {
        RED.nodes.createNode(this, config);
       
        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;

        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                msg = {payload: 1};
                node.status({fill: "green", shape: "dot", text: "Find 1 face!"});
                msg1 = {payload: 0x12345678};
                msg2 = {payload: "[1, 0x12345678]"};
                node.send([msg,msg1,msg2]);
            }//switch off
            else {
                msg = {payload: 0};
                node.status({fill: "red", shape: "ring", text: "Find 0 face!"});
                msg1 = {payload: 0x12345678};
                msg2 = {payload: "[0, 0x12345678]"};
                node.send([msg,msg1,msg2]);
            }
        });

        //clean up when re-deploying
        this.on('close', function() {
        });
    }
    
    RED.nodes.registerType("FaceDetect", FaceDetectVirtual);
}
