module.exports = function(RED) {

	var jslib = require('jsupm_geometry');
	function Geometry(config) {
		var node = this;
		node.log("Geometry detect initalizing.......");
		RED.nodes.createNode(this, config);
		var geometry = new jslib.Geometry();
        
        function detect_timer(){
            if (geometry.isDetect === true){
                switch(geometry.detect){
                    case 1:
                        node.log("Rectangle");
                        var msg =  {geometry:1};
                        node.send(msg);
                        break;
                    case 2:
                        node.log("Circle");
                        var msg =  {geometry:2};
                        node.send(msg);
                        break;
                    default:
                        node.log("Unknown");
                        var msg =  {geometry:-1};
                        node.send(msg);
                }
                geometry.isDetect = false;
            }
        }
		
		var timer;
		node.log("Geometry detect prepared.");
        node.status({fill:"blue",shape:"dot",text:"Initalized"});

        //Handle inputs
        node.on('input', function(msg) {
		this.log(Number(msg.payload));
                if(Number(msg.payload) === 1){
                    node.log("Start detect.");
                    geometry.startDetect();
                    node.status({fill:"green",shape:"dot",text:"Running"});
		    timer = setInterval(detect_timer, 50);
                }
                else{
                    node.log("Stop detect.");
                    geometry.stopDetect();
                    node.status({fill:"red",shape:"dot",text:"Stop"});
		    clearInterval(timer);                   
                }
        });

        node.on('close', function() {
        	node.log("Stop Geometry");
            geometry.stopDetect();
        });
    }
    RED.nodes.registerType("Geometry", Geometry);
}
