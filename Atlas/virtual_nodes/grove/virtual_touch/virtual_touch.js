module.exports = function(RED) {
    function TouchVirtual(config) {
        RED.nodes.createNode(this, config);
       
        //delay between emissions
        this.mode = config.mode;
        this.impulse = config.impulse;

        //a status bar that appears below the node
        this.status({fill: "red", shape: "ring", text: "no signal"});
        var node = this;
        var v_signal;
        var is_on = false;
        var loop;

        //periodically change the signal randomly
        

        //periodically switch between HIGH/MEDIUM/LOW values
        if (this.mode === 'CYCLE') {
            var values = [0, 1];
            var i = 1;
        }

        var emit = function emit() {
            if (this.mode === 'RANDOM') {
                v_signal = Math.floor(Math.random()%2);
                console.log("Virtual signal: " + v_signal);
            }
            else if (node.mode === 'CYCLE') {
                v_signal = values[i];
                if (i == 1) {
                    i = 0;
                } else {
                    i++;
                }
            }
            msg = {payload: v_signal};
            //change status
            if(v_signal == 0)
            {
                var textTemp = "turn off";
            }
            else if(v_signal == 1)
            {
                var textTemp = "turn on"
            }
            node.status({fill: "green", shape: "dot", text: textTemp});
            node.send(msg);
        }

        loop = setInterval(emit, node.impulse);

        //clean up when re-deploying
        this.on('close', function() {
            //without this, old intervals aren't cleared and run forever
            clearInterval(loop);
        });
    }
    
    RED.nodes.registerType("Touch", TouchVirtual);
}
