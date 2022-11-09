const fs = require('fs')
const folder = __dirname + '/files'

fs.readdir(folder+"/", (err, files) => {
  files.forEach(file => {
    fs.rm(folder+"-copy"+file, { recursive:true }, (err) => {
    if(err){
        console.error(err.message);
        return;
    }
    console.log("File deleted successfully");
    })
  })
})


///try{rimraf(folder+"-copy", ()=>{app()})}catch(e){app()}

function app(){
ensureExists(folder+"-copy", 0o744, (err) => {})
  
fs.readdir(folder+"/", (err, files) => {
  files.forEach(file => {
    fs.stat(folder+"/"+file, (err, stats) => {
      if (err) throw err;
      if(!stats.isDirectory()){
        fs.copyFile(folder+"/"+file, folder+"-copy/"+file, (err) => {
          if (err) throw err;
          console.log('copied');
        })
      } 
    })    
  })
})


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
    })
  }
}

