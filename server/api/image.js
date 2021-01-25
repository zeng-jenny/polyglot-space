require('dotenv/config')
const router = require('express').Router()
// const path = require('path')
const {Photo} = require('../db/models')
module.exports = router
const AWS = require('aws-sdk')
// const { v4: uuidv4 } = require("uuid");
const cors = require('cors')
const multer = require('multer')
const vision = require('@google-cloud/vision')
const {Translate} = require('@google-cloud/translate').v2
const client = new vision.ImageAnnotatorClient({
  keyFilename: './google-secrets.json'
})
const translate = new Translate({
  keyFilename: './google-secrets.json'
})

router.use(cors())

// router.get('/', async (req, res, next) => {
//   const photos = await Photo.findAll()
//   res.json(photos)
// })

router.get('/:imageId', async (req, res, next) => {
  const photo = await Photo.findByPk(req.params.imageId)
  res.json(photo)
})

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
})
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '')
  }
})

const upload = multer({storage}).single('file')

router.post('/single', upload, async (req, res) => {
  let myFile = req.file.originalname.split('.')
  const fileName = Date.now() + myFile[0]
  const fileType = myFile[myFile.length - 1]
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName + `.${fileType}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    ACL: 'public-read'
  }

  const data = await s3.upload(params).promise()

  const [result] = await client.labelDetection(data.Location)
  const labels = result.labelAnnotations

  const englishArr = labels.map(label => label.description)
  const translatedArr = []
  for (let i = 0; i < englishArr.length; i++) {
    const [translation] = await translate.translate(
      englishArr[i],
      req.body.language
    )
    console.log('TRANSLATION', translation)
    translatedArr.push(translation)
  }
  const photo = await Photo.create({
    filename: data.key,
    path: data.Location,
    language: req.body.language,
    englishWords: englishArr,
    translatedWords: translatedArr
  })
  res.json(photo)
})
