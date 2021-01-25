const router = require('express').Router()
const {Word} = require('../db/models')
module.exports = router
const {Translate} = require('@google-cloud/translate').v2
const translate = new Translate({
  keyFilename: './google-secrets.json'
})

router.get('/:wordId', async (req, res) => {
  try {
    const word = await Word.findByPk(req.params.wordId)
    res.json(word)
  } catch (err) {
    console.error(err)
  }
})
router.post('/', async (req, res) => {
  try {
    const engWord = req.body.word
    const language = req.body.language

    const [translation] = await translate.translate(engWord, language)

    const word = await Word.create({
      word: engWord,
      language: language,
      translatedWord: translation
    })
    res.json(word)
  } catch (err) {
    console.error(err)
  }
})
