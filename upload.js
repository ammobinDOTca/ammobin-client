/**
 * run nuxt generate + upload result to s3
 */
const BUCKET_NAME = process.env.BUCKET_NAME

if (!BUCKET_NAME) {
  console.error('BUCKET_NAME env not set.')
  return -1
}

const fs = require('fs')
const aws = require('aws-sdk')
const path = require('path')
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

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
            Key: fileName,
            Body: data,
            Expires: expiry,
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

uploadFolder('./dist')
