export const notifyVote = (id) => {
  return {
    type: 'UPVOTE',
    data: { id }
  }
}

const notificationReducer = (state = 'HELLO', action) => {
  switch(action.type) {
    case 'UPVOTE':
      return `UPVOTE`
    default:
      return state
  }
}

export default notificationReducer