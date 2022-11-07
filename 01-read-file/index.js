const fs = require('fs');
let stream = new fs.ReadStream(__dirname + "/text.txt", {encoding: 'utf-8'});
 
stream.on('readable', function(){
  var data = stream.read();
  if(data != null)console.log(data);
});