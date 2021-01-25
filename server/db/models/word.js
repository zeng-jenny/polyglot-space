const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
  word: Sequelize.TEXT,
  language: Sequelize.STRING,
  translatedWord: Sequelize.TEXT
})

module.exports = Word
