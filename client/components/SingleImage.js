import React from 'react'
import {fetchImage} from '../store/image'
import {connect} from 'react-redux'

export class SingleImage extends React.Component {
  componentDidMount() {
    this.props.fetchImage(this.props.match.params.imageId)
  }
  render() {
    return (
      <div className="single-plant-container">
        <img src={this.props.image.path} />
        <h3>English:</h3>
        {this.props.image.englishWords}
        <h3>Translation:</h3>
        {this.props.image.translatedWords}
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
