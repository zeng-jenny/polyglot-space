import React from 'react'
import {fetchImage} from '../store/image'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class SingleImage extends React.Component {
  constructor() {
    super()
    this.state = {
      language: {
        ja: 'Japanese',
        ru: 'Russian',
        'zh-CN': 'Chinese',
        es: 'Spanish',
        sv: 'Swedish',
        vi: 'Vietnamese'
      }
    }
  }
  componentDidMount() {
    this.props.fetchImage(this.props.match.params.imageId)
  }
  render() {
    const {image} = this.props
    // console.log(this.props.image.englishWords)
    let engKey = 0
    let transKey = 0
    return (
      <div className="single-image-container">
        <div className="single-image-pageBox">
          <img src={image.path} />
          <div className="translation">
            <div className="english">
              <h3>English</h3>
              <ul>
                {image.englishWords &&
                  image.englishWords.map(word => {
                    return (
                      <div key={engKey++}>
                        <li>{word}</li>
                      </div>
                    )
                  })}
              </ul>
            </div>
            <div className="translated">
              <h3>{this.state.language[image.language]}</h3>
              <ul>
                {image.translatedWords &&
                  image.translatedWords.map(tWord => {
                    return (
                      <div key={transKey++}>
                        <li>{tWord}</li>
                      </div>
                    )
                  })}
              </ul>
            </div>
          </div>
          <Link to="/">Back</Link>
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
    fetchImage: imageId => dispatch(fetchImage(imageId))
  }
}

export default connect(mapState, mapDispatch)(SingleImage)
