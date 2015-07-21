var IOLIB = require('../cv/addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

function fakeCameraConfigNew(src) {
    var dst = {};
    dst["interval"] = parseInt(src["interval"]) || io.fakeCameraConfig_interval;
    dst["imgFile"]    = parseInt(src["imgFile"])    || io.fakeCameraConfig_imgFile;
    dst["width"]    = parseInt(src["width"])    || io.fakeCameraConfig_width;
    dst["height"]   = parseInt(src["height"])   || io.fakeCameraConfig_height;
    return dst;
}

module.exports = function(RED) {

    /************************************************
                           Camera
     ************************************************/

    function fakeCamera(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        // call initialize CameraInit
        console.log("------> " + __dirname);

        // The 1st argument is config object
        var arg0 = fakeCameraConfigNew(config);
        console.log('init fakeCamera ' + JSON.stringify(arg0));

        // the rest arguments are callback
        var arg1 = function() {
            node.send({
                'payload' : arguments[0] // because fakeCameraCb only has single argument 
            })
        };

        io.fakeCameraInit(arg0, arg1);

        node.on('input', function(msg) {
            var arg0 = parseInt(msg.payload);
            io.fakeCameraOnData(arg0);
        });

        node.on('close', function() {
            io.fakeCameraRelease();
        })

    }

    RED.nodes.registerType("fakeCamera", fakeCamera);
}
