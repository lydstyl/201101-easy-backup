var fd = require('file-duplicates')
var fs = require('fs')
var filePath = 'path/to/file'
var dirPath = 'path/to/dir'

// async with buffer
fs.readFile(filePath, function (err, buffer) {
  if (err) throw err
  fs.find(buffer, dirPath, ['.*', '*.js'])
    .then(function (paths) {
      console.log(paths)
    })
    .catch(function (err) {
      throw err
    })
})
