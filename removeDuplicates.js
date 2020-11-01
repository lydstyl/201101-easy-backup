const fd = require('file-duplicates')
const fs = require('fs')

function removeDuplicates(filePath, dirPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, buffer) {
      if (err) {
        reject(err)
      }

      if (buffer) {
        fd.find(buffer, dirPath, ['.*', '*.js'])
          .then(function (paths) {
            const longuestDuplicates = getLonguestDuplicates(paths)

            resolve(longuestDuplicates)
          })
          .catch(function (err) {
            console.log('removeDuplicatess -> err', err)

            reject(err)
          })
      }
    })
  })
}

function getLonguestDuplicates(duplicates) {
  if (duplicates.length === 1) {
    return []
  }

  let longuestDuplicates = duplicates.sort((a, b) => {
    if (a.length < b.length) {
      return -1
    } else {
      return 1
    }
  })

  longuestDuplicates.shift()

  return longuestDuplicates
}

exports.removeDuplicates = removeDuplicates
