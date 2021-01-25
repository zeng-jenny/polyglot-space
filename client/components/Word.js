import React from 'react'
import axios from 'axios'
import {fetchWord, translateWord} from '../store/word'
import {connect} from 'react-redux'

export class Word extends React.Component {
  constructor() {
    super()
    this.state = {
      word: '',
      language: 'English',
      displayLanguage: {
        ja: 'Japanese',
        ru: 'Russian',
        'zh-CN': 'Chinese',
        es: 'Spanish',
        sv: 'Swedish',
        vi: 'Vietnamese'
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  handleSubmit = async e => {
    e.preventDefault()
    const data = await axios.post('/api/word', this.state)
    const result = await axios.get(`/api/word/${data.data.id}`)
    await this.props.fetchWord(result.data.id)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="word">Word to learn:</label>
          <input
            value={this.state.word}
            type="text"
            name="word"
            onChange={this.handleChange}
          />
          <select
            name="language"
            className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm"
            onChange={this.handleChange}
          >
            <option value="language" hidden>
              Select a Language
            </option>
            <option value="zh-CN">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="sv">Swedish</option>
            <option value="vi">Vietnamese</option>
          </select>
          <button className="curved-btn" type="submit">
            Submit
          </button>
        </form>
        <div>
          {this.props.word.id && (
            <div>
              <h3>English:</h3>
              {this.props.word.word}
              <h3>{this.state.displayLanguage[this.state.language]}:</h3>
              {this.props.word.translatedWord}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('STATE', state)
  return {
    word: state.word
  }
}

const mapDispatch = dispatch => {
  return {
    fetchWord: wordId => dispatch(fetchWord(wordId)),
    translateWord: word => dispatch(translateWord(word))
  }
}

export default connect(mapState, mapDispatch)(Word)
