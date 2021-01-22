const router = require('express').Router()
module.exports = router
const vision = require('@google-cloud/vision')
const {Translate} = require('@google-cloud/translate').v2

router.use('/users', require('./users'))
router.use('/image', require('./image'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
