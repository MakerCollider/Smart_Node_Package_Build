module.exports = function(RED) {

    var jslib = require('jsupm_camera');
    function Camera(config) {
        var node = this;
        node.log("Camera initalizing.......");
        RED.nodes.createNode(this, config);
        node.cameraId = Number(config.cameraId);
        node.frameConfig = Number(config.frameConfig);
        node.timerVal = Number(config.timerVal);
        var timer;
        switch (Number(config.frameConfig)){
            case 0:
                node.weidth = 320;
                node.height = 240;
                break;
            case 2:
                node.weidth = 1024;
                node.height = 768;
                break;
            default:
                node.weidth = 640;
                node.height = 480;
        }
        var camera = new jslib.Camera(node.cameraId, node.weidth, node.height);

        function camera_timer(){
        	var ptrString = camera.read();
            var msg =  {imagePtr:ptrString};
            node.send(msg);
        }

        node.log("Camera prepared.");
        node.status({fill:"blue",shape:"dot",text:"Initalized"});

        //Handle inputs
        node.on('input', function(msg) {
            if(Number(msg.payload) == 1)
            {
                node.log("Start Camera Timer.");
                if(camera.startCamera())
                {
                    node.timer = setInterval(camera_timer, node.timerVal);
                    node.status({fill:"green",shape:"dot",text:"Running"});
                }
                else
                {
                    node.log("Cannot open camera!");
                    node.status({fill:"red",shape:"dot",text:"Error"});
                }
            }
            else
            {
            	clearInterval(node.timer);
		camera.stopCamera();
                node.log("Stop Camera Timer.");
                node.status({fill:"red",shape:"dot",text:"Stop"});
            }
        });

        node.on('close', function() {
            node.log("Stop Camera");
	    clearInterval(node.timer);
            camera.stopCamera();
        });
    }
    RED.nodes.registerType("Camera", Camera);
}
