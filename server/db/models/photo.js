const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
  filename: Sequelize.STRING,
  path: Sequelize.TEXT,
  englishWords: Sequelize.ARRAY(Sequelize.TEXT),
  translatedWords: Sequelize.ARRAY(Sequelize.TEXT)
})

module.exports = Photo
