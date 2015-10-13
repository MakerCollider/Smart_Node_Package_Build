module.exports = function(RED) {

    var jslib = require('jsupm_facedetect');
    function FaceDetect(config) {
        var node = this;
        node.log("Face detect initalizing.......");
        RED.nodes.createNode(this, config);
        var facedetect = new jslib.CfaceDetect();
        facedetect.initFaceDetect();

        node.log("Face detect prepared.");
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
                var faceNumber = facedetect.noderedDetect(msg.imagePtr);
                var msg1 = {payload: faceNumber};
                var msg2 = {imagePtr: facedetect.m_outputString};
                node.send([msg1, msg2]);
            }
        });

        node.on('close', function() {
            node.log("Stop FaceDetect");
        });
    }
    RED.nodes.registerType("FaceDetect", FaceDetect);
}
