import React from 'react'
import './styles/Searchbar.css'
const Searchbar = () => {
  return (
    <div className="search">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search" />
          </div>
      </div>
  )
}

export default Searchbar