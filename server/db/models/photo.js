const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
  filename: Sequelize.STRING,
  path: Sequelize.TEXT,
  language: Sequelize.STRING,
  englishWords: Sequelize.ARRAY(Sequelize.TEXT),
  translatedWords: Sequelize.ARRAY(Sequelize.TEXT)
})

module.exports = Photo
