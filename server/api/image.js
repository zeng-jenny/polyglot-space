const router = require('express').Router()
const path = require('path')
module.exports = router
const multer = require('multer')
const vision = require('@google-cloud/vision')
const {Translate} = require('@google-cloud/translate').v2
const client = new vision.ImageAnnotatorClient({
  keyFilename: './google-secrets.json'
})
const translate = new Translate({
  keyFilename: './google-secrets.json'
})

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'upload.html'))
})

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '.', 'images'))
  },
  filename: function(req, file, cb) {
    const parts = file.mimetype.split('/')
    cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
  }
})

const upload = multer({storage})

router.post('/single', upload.single('image'), async (req, res) => {
  try {
    const [result] = await client.labelDetection(req.file.path)
    const labels = result.labelAnnotations

    const englishArr = labels.map(label => label.description)

    const translatedArr = []
    for (let i = 0; i < englishArr.length; i++) {
      const [translation] = await translate.translate(englishArr[i], 'zh-CN')
      translatedArr.push(translation)
    }
    console.log('success')
    res.json(englishArr)
  } catch (err) {
    console.error(err)
  }
})
