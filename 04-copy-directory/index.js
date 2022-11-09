const fs = require('fs')
const folder = __dirname + '/files'

fs.readdir(folder+"-copy/", (err, files) => {
  try{
  files.forEach(file => {
    fs.rm(folder+"-copy/"+file, { recursive:true }, (err) => {
    if(err){
        console.error(err.message);
        return;
    }
    app()
    })
  })
}catch(e){
  app()
}
})


let used = 0;
function app(){
  if(used > 0) {return 0}else{used++}
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

