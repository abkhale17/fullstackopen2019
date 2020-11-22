import React from 'react'

const Notification = ({ notification }) => {
  const stylesheet = {
    border: '1px solid black',
    padding: '5px'
  }
  const notify = notification !== '' 
  ? <div style={stylesheet}>{notification}</div>
  : null

  return notify 
}

export default Notification