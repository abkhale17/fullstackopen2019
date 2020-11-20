export const notifyVote = (content) => {
  return {
    type: 'UPVOTE',
    data: { content }
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPVOTE':
      return `You voted ${action.data.content}`
    default:
      return state
  }
}

export default notificationReducer