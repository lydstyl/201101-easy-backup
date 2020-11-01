const fs = require('fs')
const rimraf = require('rimraf')

const { settings } = require('./settings')
const { getFilePaths } = require('./getFilePaths')
const { removeDuplicates } = require('./removeDuplicates')
const { backUp } = require('./backUp')

;(async _ => {
  try {
    // get all file paths
    const files = await getFilePaths(settings.origin)

    // remove duplicates
    let toRemove = await Promise.all(
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

    // make backups
    if (settings.backup1) {
      console.log('Step 1:')

      await backUp(settings.originDir, settings.backup1)
    }

    if (settings.backup2) {
      console.log('Step 2:')

      await backUp(settings.originDir, settings.backup2)
    }

    // final step
    if (settings.removeOriginAfterBackUp) {
      // rm origin files
      console.log('Step 3:')

      rimraf(settings.origin, function () {
        console.log(
          `All is ok and files in origin folder: ${settings.origin} have been removed.`
        )
      })
    } else {
      console.log(
        `All is ok and files in origin folder: ${settings.origin} have not been removed.`
      )
    }

    // optional removeFolderDuplicates(backup2)
  } catch (error) {
    console.log('error', error)
  }
})()
