const fs = require('fs')
const path = require('path')
const less = require('less')

let srcPath = path.join(__dirname, '../demo/src/main.less');
let distPath = path.join(__dirname, '../demo/dist/main.css');

fs.watchFile(srcPath, { interval: 1000 }, (curr, prev) => {

  fs.readFile(srcPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    // console.log(data)
    less.render(data, (err, css) => {
      if (err) {
        throw err
      }
      // console.log(css);
      fs.writeFile(distPath, css.css, err => {
        if (err) {
          throw err
        }
        console.log('success');
      })
    })
  })
})


