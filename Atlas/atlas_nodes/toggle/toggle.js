
module.exports = function(RED) {

    function toggle(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        node.log('start toggle');

        var stat = parseInt(config.initVal);

        function setStat(val) {
        if(val) 
            node.status({fill: 'green', shape:'dot', text: 'on'});
        else
            node.status({fill: 'red', shape:'dot', text: 'off'});
        }

        var atlas = global.atlas;

        function sendStat() {
            var val = stat ? 1 : 0;

            node.log('send ' + val);
            node.send({'payload': val});

            setStat(stat);
            atlas.emit('toggleQuery', stat);

            stat = !stat;
        }

        node.on('input', function(msg) {
            sendStat();
        });

        atlas.on('toggle', function(data) {
            node.log('recv remote toggle');
            sendStat();
        });

        atlas.on('toggleQuery', function() {
            atlas.emit('toggleQuery', stat);
        })

        atlas.genHtml.save({
            'name': 'toggle',
            'html': 'toggle.html'
        });

        sendStat();
   }

    RED.nodes.registerType('toggle', toggle);

};
