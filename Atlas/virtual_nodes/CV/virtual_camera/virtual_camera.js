module.exports = function(RED) {
    function CameraVirtual(config) {
        RED.nodes.createNode(this, config);
       
        //delay between emissions
        this.interval = config.interval;
        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;
        var v_signal;
        var is_on = false;
        var loop;

        var emit = function emit() {
            v_signal = (Math.floor(Math.random()*100))%2;
            console.log("Virtual signal: " + v_signal);
            msg = {payload: v_signal};
            node.status({fill: "green", shape: "dot", text: "Camera is working!"});
            node.send(msg);
        }

        this.on('input', function(msg) {
            //use 'injector' node and pass string to control virtual node
            if ((msg.payload === "toggle") || (msg.payload == 1)) {
                //switch on
                if (is_on == false) {
                    is_on = true;
                    loop = setInterval(emit, node.interval);
                }
                
            }//switch off
            else {
                if (is_on == true) {
                    is_on = false;
                    msg = {payload: 0};
                    node.status({fill: "red", shape: "ring", text: "Camera closed!"});
                    node.send(msg);
                    clearInterval(loop);

                }
            }
        });

        //clean up when re-deploying
        this.on('close', function() {
            //without this, old intervals aren't cleared and run forever
            msg = {payload: 0};
            node.status({fill: "red", shape: "ring", text: "Camera closed!"});
            node.send(msg);
            clearInterval(loop);
        });
    }
    
    RED.nodes.registerType("Camera", CameraVirtual);
}
