const Rsync = require('rsync')

exports.backUp = async (origin, backup) => {
  return new Promise((resolve, reject) => {
    // Build the command
    const rsync = new Rsync()
      .shell('ssh')
      .flags('az')
      .source(origin)
      .destination(backup)

    // Execute the command
    rsync.execute(function (error, code, cmd) {
      console.log(`Backing up ${origin} to ${backup} with cmd ${cmd}`)

      if (error) {
        console.log('exports.backUp -> code', code)

        console.log('exports.backUp -> error', error)

        reject(error)
      }

      // we're done
      console.log('Backup ok.\n')
      resolve()
    })
  })
}
