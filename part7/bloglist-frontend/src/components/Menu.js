import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
    margin: 10,
  }

  const sheet = {
    padding: '20px',
    backgroundColor: 'grey',
    marginBottom: '20px',
  }
  return (
    <div style={sheet}>
      <Link to='/' style={padding}>Blogs</Link>
      <Link to='/users' style={padding}>Users</Link>
      <span>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  )
}

export default Menu