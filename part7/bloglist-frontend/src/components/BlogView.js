import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentIt } from '../reducers/blogsReducer'

const BlogView = ({ blog, handleLike, handleRemove, notifyWith, own }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  if(!blog) {
    return null
  }
  const likeBtn = {
    background:'#8080ff', 
    color: '#fff',
  }

  const removeBtn = {
    background:'#cc5656',
    color:'#fff',
  }

  const margin = {
    marginBottom: '20px',
  }

  const addComment = (event) => {
    event.preventDefault()
    try {
      dispatch(commentIt(blog, comment))
      notifyWith(`You commented on Blog '${blog.title}'`)
    } catch(exception) {
      console.log(exception,'exceptoon oocured')
    }
    setComment('')
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)} style={likeBtn}>like</button>
      </div>
      <p>Added by {blog.user.name}</p>
      <a href='https://www.wikipedia.org/'>{blog.url}</a>
      {own&&<button onClick={() => handleRemove(blog.id)} style={removeBtn}>remove</button>}
      <h4>Comments:</h4>
      <form onSubmit={addComment} style={margin}>
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>Add Comment</button>
      </form>
      {
        blog.comments.map((comment,idx) => <li key={idx}>{comment}</li>)
      }

    </div>
  )
}

export default BlogView