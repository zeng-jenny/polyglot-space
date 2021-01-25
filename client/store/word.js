import axios from 'axios'

const GET_WORD = 'GET_WORD'
const TRANSLATE_WORD = 'TRANSLATE_WORD'

const getWord = word => {
  return {
    type: GET_WORD,
    word
  }
}
const transWord = word => {
  return {
    type: TRANSLATE_WORD,
    word
  }
}

export const fetchWord = wordId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/word/${wordId}`)
      dispatch(getWord(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const translateWord = word => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/word', word)
      return dispatch(transWord(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WORD:
      return action.word
    case TRANSLATE_WORD:
      return action.word
    default:
      return state
  }
}
