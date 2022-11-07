const fs = require('fs')
var path = require('path')
const styleFolder = __dirname + '/styles/'
const componentFolder = __dirname +  '/components/'

try{
  rimraf(__dirname + '/project-dist/', ()=>{
    app()
  })
}catch(e){
  app()
}

function app(){
  let stream = new fs.ReadStream(__dirname + "/template.html", {encoding: 'utf-8'})

  stream.on('readable', function(){
    var data = stream.read()
    writeToString(data)
  })

  function writeToString(txt){
    let msg = txt;
    fs.readdir(componentFolder, (err, files) => {
      files.forEach(file => {
        fs.stat(componentFolder+file, (err, stats) => {
          if (err) throw err;
           if(!stats.isDirectory() && file.split('.')[1] === 'html'){
            let stream = new fs.ReadStream(componentFolder+file, {encoding: 'utf-8'})
            stream.on('readable', function(){
                var data = stream.read()
                if(txt && data){
                  msg = msg.replace("{{"+file.split('.')[0]+"}}", data).replace('style.css','bundle.css')
                  fs.writeFile(__dirname + '/project-dist/index.html', msg, (err) => {
                  if (err) return console.log(err)
                })          
              }
            })
           }
        })
      })
    })
  }

  ensureExists(__dirname + '/project-dist/', 0o744, (err) => {})

  fs.writeFile(__dirname + '/project-dist/bundle.css', '', (err) => {
    if (err) return console.log(err)
  })

  fs.readdir(styleFolder, (err, files) => {
    files.forEach(file => {
      fs.stat(styleFolder+file, (err, stats) => {
        if (err) throw err;
         if(!stats.isDirectory() && file.split('.')[1] === 'css'){
          writeFile(file)
         }
      })
    
    })
  })

  function writeFile(filename) {
    console.log('completed '+filename)
    let txt = styleFolder + filename
    let stream = new fs.ReadStream(txt, {encoding: 'utf-8'})
    stream.on('readable', function(){
      var data = stream.read();
      if(data != null)
      fs.appendFile(__dirname + '/project-dist/bundle.css', '\n'+data, (err) => {
        if (err) return console.log(err)
      })
    })
  }

  const folderAssets = __dirname + '/project-dist/assets'

  ensureExists(folderAssets, 0o744, (err) => {})

  fs.readdir(__dirname + '/assets/', (err, files) => {
    files.forEach(file => {
    
      fs.stat(__dirname + '/assets/'+file, (err, stats) => {
        if (err) throw err;  
          if(stats.isDirectory()){
              ensureExists(folderAssets+'/'+file, 0o744, (err) => {})
              fs.readdir(__dirname + '/assets/'+file, (err, files) => {
                files.forEach(innerFile => {
                    fs.copyFile(__dirname + '/assets/'+file+'/'+innerFile, folderAssets+'/'+file+'/'+innerFile, (err) => {
                      if (err) throw err;
                      // console.log('06-build-page/assets/'+file+innerFile, 'copied');
                    })
                })

              })
          }
      })


    })
  })


  ensureExists(__dirname + '/assets/'+'test', 0o744, (err) => {})



  function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') {
        cb = mask
        mask = 0o744
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null)
            else cb(err)
        } else cb(null)
    });
}
}