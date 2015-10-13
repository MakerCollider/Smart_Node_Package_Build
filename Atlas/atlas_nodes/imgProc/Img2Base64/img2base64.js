module.exports = function(RED) {

    var jslib = require('jsupm_img2base64');
    function Img2Base64(config) {
        var node = this;
        node.log("img2Base64 initalizing.......");
        RED.nodes.createNode(this, config);
        var img2Base64 = new jslib.Cimg2Base64();

        node.log("img2Base64 prepared.");
        node.status({fill:"green",shape:"dot",text:"Running"});

        //Handle inputs
        node.on('input', function(msg) {
            if((typeof msg.imagePtr) != "string")
            {
                this.log("Input Error! Wrong Topic");
                node.status({fill:"red", shape:"dot", text:"InputError"});
            }
            else
            {
                var result = img2Base64.noderedBase64(msg.imagePtr);
                if(result == -1)
                {
                    this.log("Input Error! Wrong String Format");
                    node.status({fill:"red", shape:"dot", text:"WrongFormat"});                   
                }
                var msg1 = {payload: img2Base64.m_outputString};
                node.send(msg1);
            }
        });

        node.on('close', function() {
            node.log("Stop img2Base64");
        });
    }
    RED.nodes.registerType("Img2Base64", Img2Base64);
}
