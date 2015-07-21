var Board = require('bindings')('galileo.node');

module.exports = function(options) {
  var self = this;
  Board.IO.call(self, options);

}
