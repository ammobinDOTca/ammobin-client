/**
 * run nuxt generate + upload result to s3
 * as of jan 2020, this is not used
 */
const BUCKET_NAME = process.env.BUCKET_NAME

const fs = require('fs')
const aws = require('aws-sdk')
const path = require('path')
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const getLangFromFileName = fileName => {
  if (fileName.includes('/fr/')) {
    return 'fr-CA'
  } else {
    return 'en-CA'
  }
}

const getContentTypeFromFileName = fileName => {
  if (fileName.endsWith('.js')) {
    return 'text/javascript'
  } else if (fileName.endsWith('.html')) {
    return 'text/html'
  } else if (fileName.endsWith('.css')) {
    return 'text/css'
  } else if (fileName.endsWith('.png')) {
    return 'image/png'
  } else if (fileName.endsWith('.ico')) {
    return 'image/x-icon'
  } else {
    return 'text/plain'
  }
}

const dist = 'dist/'
function uploadFolder(folder) {
  const files = fs.readdirSync(folder).map(f => path.join(folder, f))

  files
    .filter(f => !fs.lstatSync(f).isDirectory())
    .forEach(fileName => {
      fs.readFile(fileName, (err, data) => {
        if (err) throw err
        // tell s3 to delete file after 30 days (should be regenerated well before)
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + 30)

        s3.upload(
          {
            Bucket: BUCKET_NAME,
            Key: fileName.replace(dist, ''),
            Body: data,
            Expires: expiry,
            ContentType: getContentTypeFromFileName(fileName),
            ContentLanguage: getLangFromFileName(fileName),
          },
          function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
          }
        )
      })
    })
  files.filter(f => fs.lstatSync(f).isDirectory()).forEach(f => uploadFolder(f))
}

uploadFolder(dist)
