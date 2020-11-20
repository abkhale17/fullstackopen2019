import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const notificationDisplay = useSelector(state => state.notification.display)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notificationDisplay
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification