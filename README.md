# Easy backup

This is a node.js script that will take a folder, back it up to 2 differentes places then remove the original folder files.

It also remove duplicates files from the origin folder and befor the back up.

How to use this script ?

## clone this repo to your machine

## npm i

## make a settings.js at the root of the repo

```javascript
exports.settings = {
  originDir: './2020', // the folder you want to back up. It will be empty at the end
  origin: './2020/**/*', // the magic string to select what to back up
  backup1: './backup1', // the first backup folder
  backup2: './backup2', // the seconde backup folder
  removeOriginAfterBackUp: false, // carreful with this one
}
```

## npm start
