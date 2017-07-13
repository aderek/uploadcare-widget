/* eslint no-console: off */
const ngrok = require('ngrok')
const browserSync = require('browser-sync')
const fs = require('fs')

const config = {
  port: 3219,
  server: './pkg/latest',
  files: './pkg/latest',
  directory: true,
  open: false,
}

/**
 * Save url generated by ngrok to file
 * @param url
 */
function saveUrl(url) {
  fs.writeFile('serve-url.log', url, error => {
    if (error) {
      return console.log(error)
    }

    console.log('serve-url.log updated!')
  })
}

browserSync(config, (error, bs) => {
  if (error) {
    throw new Error(error)
  }

  ngrok.connect(bs.options.get('port'), (error, url) => {
    if (error) {
      throw new Error(error)
    }

    console.log('Open in browser: ', url)

    saveUrl(url)
  })
})