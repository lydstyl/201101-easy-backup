const { settings } = require('./settings')
const { getFilePaths } = require('./getFilePaths')

;(async _ => {
  const files = await getFilePaths(settings.origin)

  console.log('getFilePaths -> files', files)
})()

// removeFolderDuplicates(origin)

// backUp(origin, backup1)

// backUp(origin, backup2)

// removeFolderDuplicates(backup2)
