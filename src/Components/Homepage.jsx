import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Homestyle.css'


function Homepage() {
    
  return (
    <div>
        <Link to={'/allblogs'}><button>Allblogs</button></Link>
    </div>
  )
}

export default Homepage
