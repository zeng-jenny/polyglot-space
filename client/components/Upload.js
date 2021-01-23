import React from 'react'
import axios from 'axios'
import {addImage} from '../store/image'
import {connect} from 'react-redux'
import {Columns, Button, Section, Heading, Form} from 'react-bulma-components'

export class Upload extends React.Component {
  constructor() {
    super()
    this.set = {
      image: {},
      language: 'English'
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   formData.append('image', this.state.image)
  //   this.props.addImage(formData)
  // }

  render() {
    return (
      <div className="upload-form-container">
        <div className="upload-form">
          <section className="pageBox" align="center">
            <form
              // onSubmit={this.handleSubmit}
              action="/api/image/single"
              method="POST"
              encType="multipart/form-data"
            >
              <input type="file" name="image" onChange={this.handleChange} />
              <select name="language" onChange={this.handleChange}>
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

              <button type="submit">Submit</button>
            </form>
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
