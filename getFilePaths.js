const glob = require('glob')

function getFilePaths(magicPath) {
  return new Promise((resolve, reject) => {
    glob(magicPath, {}, function (err, files) {
      if (err) {
        // console.log('getFilePaths -> err', err)

        reject(err)
      } else {
        // console.log('files', files)

        resolve(files)
      }
    })
  })
}

exports.getFilePaths = getFilePaths
