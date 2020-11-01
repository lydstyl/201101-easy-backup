const fs = require('fs')
const fd = require('file-duplicates')

const { getFilePaths } = require('./getFilePaths')

async function getFileDuplicates(buffer, dirPath) {
  try {
    const paths = await fd.find(buffer, dirPath, ['.*', '*.js'])

    const longuestDuplicates = getLonguestDuplicates(paths)

    return longuestDuplicates
  } catch (error) {
    console.log('getFileDuplicates -> error', error)

    return error
  }
}

function getDuplicates(filePath, dirPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, buffer) {
      if (err) {
        reject(err)
      }

      if (buffer) {
        const longuestDuplicates = getFileDuplicates(buffer, dirPath)

        resolve(longuestDuplicates)
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

const removeDuplicates = async (magicPath, path) => {
  try {
    // get all file paths
    const files = await getFilePaths(magicPath)

    // remove duplicates
    let toRemove = await Promise.all(
      files.map(async file => {
        try {
          const longuestDuplicates = await getDuplicates(file, path)

          if (longuestDuplicates.length) {
            return longuestDuplicates
          }
        } catch (error) {
          console.log('error', error)
        }
      })
    )

    // remove undefineds
    const toRemove2 = toRemove.filter(item => item !== undefined)

    // compile into 1 array
    let toRemove3 = []

    toRemove2.forEach(arr => {
      toRemove3 = [...toRemove3, ...arr]
    })

    // remove duplicate of toRemove3
    const uniqsToRemove = [...new Set(toRemove3)]

    // remove duplicates on hard drive
    uniqsToRemove.forEach(async file => {
      await fs.unlinkSync(file)
    })
  } catch (error) {
    console.log('error', error)
  }
}

exports.removeDuplicates = removeDuplicates
