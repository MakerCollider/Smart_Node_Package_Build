var IOLIB = require('./addon');

var io = new IOLIB.IO({
  log: true,
  quickInit: false
});

function cameraConfigNew(src) {
    var dst = {};
    dst["interval"] = parseInt(src["interval"]) || io.cameraConfig_interval;
    dst["camId"]    = parseInt(src["camId"])    || io.cameraConfig_camId;
    dst["width"]    = parseInt(src["width"])    || io.cameraConfig_width;
    dst["height"]   = parseInt(src["height"])   || io.cameraConfig_height;
    return dst;
}

function faceDetectConfigNew(src) {
    var dst = {};
    dst["imgWidth"]   = parseInt(src["imgWidth"])   || io.faceDetectConfig_imgHeight;
    dst["imgHeight"]  = parseInt(src["imgHeight"])  || io.faceDetectConfig_imgHeight;
    dst["faceWidth"]  = parseInt(src["faceWidth"])  || io.faceDetectConfig_faceWidth;
    dst["faceHeight"] = parseInt(src["faceHeight"]) || io.faceDetectConfig_faceHeight;
    return dst;
}

function img2Base64ConfigNew(src) {
    var dst = {};
    dst["imgType"]   = src["imgType"]   || io.img2Base64Config_imgType;
    dst["quality"]   = parseInt(src["quality"])   || io.img2Base64Config_quality;
    dst["maxWidth"]  = parseInt(src["maxWidth"])  || io.img2Base64Config_maxWidth;
    dst["maxHeight"] = parseInt(src["maxHeight"]) || io.img2Base64Config_maxHeight;
    return dst;
}

var RedUtil = require('../../lib/red-util.js');

module.exports = function(RED) {

    /************************************************
                           Camera
     ************************************************/

    function camera(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        // call initialize CameraInit

        // The 1st argument is config object
        var arg0 = cameraConfigNew(config);
        console.log('init camera ' + JSON.stringify(arg0));

        // the rest arguments are callback
        var arg1 = function() {
            node.send({
                'payload' : arguments[0] // because cameraCb only has single argument 
            })
        };

        io.cameraInit(arg0, arg1);

        node.on('input', function(msg) {
            var arg0 = parseInt(msg.payload);
            io.cameraOnData(arg0);
        });

        node.on('close', function() {
            io.cameraRelease();
        })

    }

    RED.nodes.registerType("camera", camera);

    /************************************************
            Face Detection
     ************************************************/

    function faceDetect(config) {

        console.log(__dirname);

        RED.nodes.createNode(this,config);
        var node = this;

        var arg0 = faceDetectConfigNew(config);

        var arg1 = function(){
            node.send([{'payload': arguments[0]}, null, null]);
        }


        var arg2 = function() {
            node.send([null, {'payload': arguments[0]}, null]);
        };

        var arg3 = function() {
            node.send([ null,
                        null,
                        {'payload': [arguments[0], arguments[1]] },           
                     ]);
         
        };

        io.faceDetectInit(arg0, arg1, arg2, arg3);

        node.on('input', function(msg) {
            var arg0 = msg.payload;

            io.faceDetectOnData(arg0);
        })

        node.on('close', function() {
            io.faceDetectRelease();
        })

    }

    RED.nodes.registerType("faceDetect", faceDetect);

    /************************************************
            Img to Base64
     ************************************************/

    function img2Base64(config) {

        RED.nodes.createNode(this,config);
        var node = this;

        var arg0 =  img2Base64ConfigNew(config);

        var arg1 = function() {
            console.log('---->\n');
            console.log(arguments[0]);

            node.send({
                'payload': arguments[0]
            });
        };

        io.img2Base64Init(arg0, arg1);

        node.on('input', function(msg) {
            var arg0  = msg.payload;
            io.img2Base64OnData(arg0);
        });

        node.on('close', function() {
            io.img2Base64Release();
        });
    }

    RED.nodes.registerType("img2Base64", img2Base64);
}
