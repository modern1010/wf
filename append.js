var fs = require('fs');

// Reading the contents of f2.txt
fs.readFile('f2.txt', 'utf8', function(err, data) {
  if (err) throw err;

  // Appending the contents of f2.txt to f1.txt
  fs.appendFile('f1.txt', data, function(err) {
    if (err) throw err;
    console.log('Updated');
  });
});
