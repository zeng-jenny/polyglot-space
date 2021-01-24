import axios from 'axios'

const GET_IMAGE = 'GET_IMAGE'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

const getImage = image => {
  return {
    type: GET_IMAGE,
    image
  }
}

const uploadImage = image => {
  return {
    type: UPLOAD_IMAGE,
    image
  }
}

export const fetchImage = imageId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/image/${imageId}`)
      dispatch(getImage(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addImage = image => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/image/single', image)
      return dispatch(uploadImage(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return action.image
    case GET_IMAGE:
      return action.image
    default:
      return state
  }
}
