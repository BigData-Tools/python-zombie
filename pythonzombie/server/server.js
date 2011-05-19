var net = require('net');
var sys = require('sys');
var zombie = require('zombie');
var browser = null;
var buffer = "";

//
// Simple proxy server implementation
// for proxying streamed (Javascript) content via HTTP
// to a running Zombie.js
//
// Borrowed (heavily) from the Capybara-Zombie project
// https://github.com/plataformatec/capybara-zombie
//

net.createServer(function (stream){
  stream.setEncoding('utf8');

  stream.on('data', function (data){
    buffer += data;
    if (browser == null)
      browser = new zombie.Browser();
    eval(buffer);
    buffer = "";
  });

}).listen(process.argv[2]);

console.log('Node TCP server running on '+process.argv[2]+'...');
