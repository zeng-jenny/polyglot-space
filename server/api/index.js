const router = require('express').Router()
module.exports = router
const vision = require('@google-cloud/vision')
const {Translate} = require('@google-cloud/translate').v2

async function quickstart() {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './google-secrets.json'
  })
  const translate = new Translate({
    keyFilename: './google-secrets.json'
  })
  const [result] = await client.labelDetection(
    '//Users/jzeng/Grace-Hopper-Program/Stackathon/public/shiba-inu.jpg'
  )
  const labels = result.labelAnnotations
  // console.log('Labels:');
  const englishArr = labels.map(label => label.description)

  const translatedArr = []
  for (let i = 0; i < englishArr.length; i++) {
    const [translation] = await translate.translate(englishArr[i], 'zh-CN')
    translatedArr.push(translation)
  }
  console.log(englishArr, translatedArr)
}
quickstart()

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
