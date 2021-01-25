import React from 'react'
import axios from 'axios'
import {fetchWord, translateWord} from '../store/word'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
    try {
      const result = await this.props.translateWord(this.state)
      await this.props.fetchWord(result.word.id)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="word-container">
        <div className="word-form">
          <section className="word-pageBox">
            <div className="word">
              <h1 className="app-name">polyglot space</h1>
              <p>enter a & learn a new language</p>
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

                <div>
                  {this.props.word.id && (
                    <div>
                      <h3>English:</h3>
                      {this.props.word.word}
                      <h3>
                        {this.state.displayLanguage[this.props.word.language]}:
                      </h3>
                      {this.props.word.translatedWord}
                    </div>
                  )}
                </div>
              </form>
            </div>{' '}
            <div className="back-btn">
              <button className="home-btn curved-btn" type="button">
                <Link to="/">Back</Link>
              </button>
            </div>
          </section>
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
