var atlas = global.atlas;
var ejs = require('ejs');
var fs = require('fs');

module.exports = function(RED) {
    function dispImg(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var name = config.name;

        node.on('input', function(data) {
            if(typeof data == "object" && data['payload'] != undefined) {
                atlas.emit(name, data.payload);
            } else {
                atlas.emit(name, data);
            }
        });  

        atlas.genHtml.save({
            'name': 'dispImg',
            'html': 'dispImg.html'
        });
    }

    RED.nodes.registerType("dispImg", dispImg);

    function dispGauge(config) {
        console.log
        RED.nodes.createNode(this, config);
        var node = this;
        var name = config.name;

        node.on('input', function(data) {
            if(typeof data == "object" && data['payload'] != undefined) {
                atlas.emit(name, data.payload);
            } else {
                atlas.emit(name, data);
            }
        });  

        var buf = fs.readFileSync(__dirname + '/dispGauge.ejs').toString();

        var bufHtml = ejs.render(buf, {'config': config});
        fs.writeFileSync(atlas.htmlDir + '/' + name + '.html', bufHtml);

        atlas.genHtml.save({
            'name': name,
            'html': name + '.html',
            'width': 320,
            'height': 180
        });
    }

    RED.nodes.registerType("dispGauge", dispGauge);    

};