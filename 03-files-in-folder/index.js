const fs = require('fs')

const testFolder = __dirname + '/secret-folder/'

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    fs.lstat(testFolder+file, function(err, stats) {
      if (!err && !stats.isDirectory()) {
        fs.stat(__dirname + '/secret-folder/'+ file, (err, stats) => {
          console.log(`${file.split('.')[0]} - ${file.split('.')[1]} - ${stats.size/1000}kb`)
        })
      }
    })
  })
})
