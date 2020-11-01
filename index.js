const fs = require('fs')

const { settings } = require('./settings')
const { getFilePaths } = require('./getFilePaths')
const { removeDuplicates } = require('./removeDuplicates')
const { backUp } = require('./backUp')

;(async _ => {
  // get all file paths
  const files = await getFilePaths(settings.origin)

  // remove duplicates
  await Promise.all(
    files.map(async file => {
      try {
        const longuestDuplicates = await removeDuplicates(
          file,
          settings.originDir
        )

        if (longuestDuplicates.length) {
          return longuestDuplicates
        }
      } catch (error) {
        console.log('error', error)
      }
    })
  )
    .then(toRemove => {
      // remove undefineds
      return toRemove.filter(item => item !== undefined)
    })
    .then(toRemove2 => {
      // compile into 1 array
      let toRemove3 = []

      toRemove2.forEach(arr => {
        toRemove3 = [...toRemove3, ...arr]
      })

      return toRemove3
    })
    .then(toRemove3 => {
      // remove duplicate of toRemove3
      return [...new Set(toRemove3)]
    })
    .then(uniqsToRemove => {
      // remove duplicates on hard drive
      uniqsToRemove.forEach(async file => {
        await fs.unlinkSync(file)
      })

      return
    })
    .then(_ => {
      backUp(settings.originDir, settings.backup1)

      backUp(settings.originDir, settings.backup2)

      // rm origin files

      // optional removeFolderDuplicates(backup2)
    })
})()
