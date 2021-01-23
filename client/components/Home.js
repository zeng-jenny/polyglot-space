import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-pageBox">
        <h2>polyglot space</h2>
        <p>a digital place to:</p>
        <button className="curved-btn" type="button">
          <Link to="/image/upload">learn an image in a new language</Link>
        </button>
        <button className="home-btn curved-btn" type="button">
          <Link to="/word">learn a word in a new language</Link>
        </button>
      </div>
    </div>
  )
}

export default Home
