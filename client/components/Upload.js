import React from 'react'

export default class Upload extends React.Component {
  render() {
    return (
      <form
        action="/api/image/single"
        method="POST"
        encType="multipart/form-data"
      >
        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
