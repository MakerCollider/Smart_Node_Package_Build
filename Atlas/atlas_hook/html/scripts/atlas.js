
Atlas = function() {
  this.address = 'http://localhost:1880';
  this.event2cb = {};
  this.event2cb['connect'] = [];
  this.event2cb['disconnect'] = [];
};

Atlas.prototype.login = function() {

  var self = this;

  if(document.location.origin != 'file://') { 
    self.address = document.location.origin;
    self.connect();
  } else {
    bootbox.prompt({
      title: 'Atlas server address',
      value: self.address,
      callback: function(result) {
        if(result == null) {
          window.open('','_self', '').close();
          return;
        }
        
        $.blockUI({message:'<h1>connecting ' + result + ' </h1>'});       
        self.connect();
      }
    }); 
  }

}

Atlas.prototype.onConnect = function() {

  $.unblockUI();   
  for(idx in this.event2cb) {

    if(idx == 'connect') {

      var ccb = this.event2cb[idx];

      for(c in ccb) {
        ccb[c]();
      }

    } else {
      this.socket.on(idx, this.event2cb[idx]);
    }
  }
}

Atlas.prototype.disconnect = function() {
  //alert('disconnect');

  var dcb = this.event2cb['disconnect'];

  for(d in dcb) {
    dcb[d]();
  }

  window.close();
}

Atlas.prototype.connect = function() {
  var self = this;
  this.socket = io(this.address);

  this.socket.on('connect', function() {
    self.onConnect();
  });

  this.socket.on('disconnect', function() {
    self.disconnect();
  });
}

Atlas.prototype.on = function(event, cb) {
  if(event == 'connect' || event == 'disconnect') {
    this.event2cb[event].push(cb);
  } else {
    this.event2cb[event] = cb; 
  }
}

Atlas.prototype.emit = function(event, val) {
  this.socket.emit(event, val);
}

if(typeof atlas === 'undefined') {
  atlas = new Atlas();
  atlas.login();
}
