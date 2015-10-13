module.exports = function(RED) {

    var jslib = require('jsupm_geometry');
    function Geometry(config) {
        var node = this;
        node.log("Geometry detect initalizing.......");
        RED.nodes.createNode(this, config);
        var geometry = new jslib.Geometry();

        node.log("Geometry detect prepared.");
        node.status({fill:"green",shape:"dot",text:"Running"});

        //Handle inputs
        node.on('input', function(msg) {
            if((typeof msg.imagePtr) != "string")
            {
                this.log("Input Error!");
                node.status({fill:"red", shape:"dot", text:"InputError"});
            }
            else
            {
                var geometryType = geometry.noderedDetect(msg.imagePtr);
                var msg1 = {payload: geometryType};
                var msg2 = {imagePtr: geometry.m_outputString};
                node.send([msg1, msg2]);
            }
        });

        node.on('close', function() {
            node.log("Stop Geometry");
        });
    }
    RED.nodes.registerType("Geometry", Geometry);
}
