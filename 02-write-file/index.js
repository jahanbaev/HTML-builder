const readline = require('readline').createInterface({input: process.stdin,output: process.stdout})
const fs = require('fs')
process = require('process')

fs.writeFile(__dirname + '/text.txt', '', (err) => {
  if (err) return console.log(err)
})

process.on('beforeExit', (code) => {
  console.log('\nждём вас снова!!!')
})

console.log('привет, вводите ваш текст:')

const setInput = () =>{
  readline.question('->', txt => {

    if(txt == 'exit'){
      console.log('ждём вас снова!!!')
      process.exit()
    }

    fs.appendFile(__dirname + '/text.txt', '\n'+txt, (err) => {
      if (err) return console.log(err)
    })
    
    setInput()

  })
}

setInput()
