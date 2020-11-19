import React from 'react'

const Notification = ({ message, error }) => {
  const color = error ? 'red': 'green'
  return (
    <div style={{ color: color }} className='message'>{message}</div>
  )
}

export default Notification