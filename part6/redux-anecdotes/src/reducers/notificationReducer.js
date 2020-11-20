export const notifyVote = (content) => {
  return {
    type: 'UPVOTE',
    data: { content }
  }
}

export const notifyAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: { content }
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPVOTE':
      return `You voted ${action.data.content}`
    case 'CREATE':
      return `You added ${action.data.content}`
    default:
      return state
  }
}

export default notificationReducer