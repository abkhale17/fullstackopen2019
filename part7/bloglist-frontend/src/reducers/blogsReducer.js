import blogService from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT':
      return action.data.sort(byLikes)
    case 'CREATE':
      return [...state, action.data]
    case 'LIKE':
      const liked = action.data
      return state.map(a => a.id === liked.id ? liked : a)
    case 'REMOVE':
      return state.filter(a => a.id !== action.id)
    case 'COMMENT':
      const commented = action.data
      return state.map(a => a.id === commented.id ? commented : a)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      id
    })
  }
}

export const commentIt = (blog, comment) => {
  return async dispatch => {
    const commentedBlog = { ...blog, comments: [...blog.comments, comment] }
    const data = await blogService.commentToBlog(commentedBlog)
    dispatch({
      type: 'COMMENT',
      data
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export default reducer