import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-pageBox">
        <div className="home">
          <h1 className="app-name">polyglot space</h1>
          <p>a digital place to:</p>
          <div className="home-links">
            <button className="curved-btn" type="button">
              <Link to="/image/upload">learn a new language through image</Link>
            </button>
            <button className="home-btn curved-btn" type="button">
              <Link to="/word">learn a new language through text</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
