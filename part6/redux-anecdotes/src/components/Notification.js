import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const notificationDisplay = useSelector(state => state.notifyDisplay)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notificationDisplay
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification