const rimraf = require('rimraf')

const { settings } = require('./settings')
const { removeDuplicates } = require('./removeDuplicates')
const { backUp } = require('./backUp')

;(async _ => {
  try {
    await removeDuplicates(settings.origin, settings.originDir)

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
