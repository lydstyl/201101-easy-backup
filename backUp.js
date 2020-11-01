const Rsync = require('rsync')

exports.backUp = (origin, backup) => {
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
    }

    // we're done
    console.log('yyéééé\n')
  })
}
