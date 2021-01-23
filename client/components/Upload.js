import React from 'react'
import axios from 'axios'
import {addImage} from '../store/image'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Upload extends React.Component {
  constructor() {
    super()
    this.state = {
      image: {},
      language: 'English',
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.postFile = this.postFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  postFile = async file => {
    const formdata = new FormData()
    formdata.append('file', file)
    formdata.append('language', this.state.language)
    try {
      const result = await axios.post('/api/image/single', formdata)
      this.setState({
        image: result
      })
    } catch (err) {
      console.error(err)
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    setTimeout(() => {
      this.setState(prevState => ({
        isLoading: !prevState.isLoading
      }))
    })
    const data = await axios.post('/api/image/translate', this.state)
    this.props.history.push(`/image/${data.data.id}`)
  }

  render() {
    return (
      <div className="upload-form-container">
        <div className="upload-form">
          <section className="pageBox" align="center">
            <h2>polyglot space</h2>
            <p>upload an image & learn a new language</p>
            <form onSubmit={this.handleSubmit}>
              <div className="choose-file input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <input
                  type="file"
                  name="image"
                  className="form-control border-0 choose-file-btn"
                  onChange={event => {
                    const file = event.target.files[0]
                    this.postFile(file)
                  }}
                />
                <div className="input-group-append" />
              </div>
              <div className="select is-primary">
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
              </div>
              <div>
                {this.state.isLoading ? (
                  <button className="curved-btn" type="submit" disabled={true}>
                    Translating...
                  </button>
                ) : (
                  <button className="curved-btn" type="submit">
                    Submit
                  </button>
                )}
              </div>
              <button className="home-btn curved-btn" type="button">
                <Link to="/">Home</Link>
              </button>
            </form>

            <div />
          </section>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    image: state.image
  }
}

const mapDispatch = dispatch => {
  return {
    addImage: image => dispatch(addImage(image))
  }
}

export default connect(mapState, mapDispatch)(Upload)
