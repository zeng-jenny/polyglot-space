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
      file: {},
      language: 'English',
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleFileChange = evt => {
    this.setState({
      file: evt.target.files[0]
    })
  }

  handleChange = evt => {
    this.setState({
      language: evt.target.value
    })
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    setTimeout(() => {
      this.setState(prevState => ({
        isLoading: !prevState.isLoading
      }))
    })
    const formdata = new FormData()
    formdata.append('file', this.state.file)
    formdata.append('language', this.state.language)
    try {
      const image = await this.props.addImage(formdata)
      console.log('IMAGE', image)
      this.props.history.push(`/image/${image.image.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="upload-form-container">
        <div className="upload-form">
          <section className="upload-pageBox" align="center">
            <div className="upload">
              <h1 className="app-name">polyglot space</h1>
              <p>upload an image & learn a new language</p>
              <form onSubmit={this.handleSubmit}>
                <div className="choose-file input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                  <input
                    type="file"
                    name="image"
                    className="form-control border-0 choose-file-btn"
                    onChange={this.handleFileChange}
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
                    <button
                      className="curved-btn"
                      type="submit"
                      disabled={true}
                    >
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
            </div>
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
