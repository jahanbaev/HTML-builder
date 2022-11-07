const fs = require('fs')
var path = require('path')

ensureExists(__dirname + '/project-dist/', 0o744, (err) => {})

const testFolder =__dirname + '/styles/'

fs.writeFile(__dirname + '/project-dist/bundle.css', '', (err) => {
  if (err) return console.log(err)
})

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    fs.stat(testFolder+file, (err, stats) => {
      if (err) throw err;
      if(!stats.isDirectory() && file.split('.')[1] === 'css'){
        writeFile(file)
      }
    })    
  })
})

function writeFile(filename) {
  console.log('completed '+filename)
  let txt = testFolder + filename
  let stream = new fs.ReadStream(txt, {encoding: 'utf-8'})
  stream.on('readable', function(){
    var data = stream.read();
    if(data != null)
    fs.appendFile(__dirname + '/project-dist/bundle.css', '\n'+data, (err) => {
      if (err) return console.log(err)
    })
  })
}


function ensureExists(path, mask, cb) {
  if (typeof mask == 'function') {
      cb = mask;
      mask = 0o744;
  }
  fs.mkdir(path, mask, function(err) {
      if (err) {
          if (err.code == 'EEXIST') cb(null); 
          else cb(err); 
      } else cb(null); 
  });
}