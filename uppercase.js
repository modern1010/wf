// if not running run commond :-npm install upper-case

// G:\New folder\uppercase.js

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  // Convert the string to uppercase without using upper-case module
  var uppercaseString = "Hello World!".toUpperCase();
  
  // Send the response
  res.write(uppercaseString);
  res.end();
}).listen(8080);

console.log('Server running at http://localhost:8080/');
