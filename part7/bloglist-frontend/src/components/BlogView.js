import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentIt } from '../reducers/blogsReducer'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

const BlogView = ({ blog, handleLike, handleRemove, notifyWith, own }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  if(!blog) {
    return null
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
        <Button variant="contained" color="primary" onClick={() => handleLike(blog.id)} >like</Button>
      </div>
      <p>Added by {blog.user.name}</p>
      <a href='https://www.wikipedia.org/'>{blog.url}</a>
      {own&&<Button variant="contained" color="secondary" onClick={() => handleRemove(blog.id)} >remove</Button>}
      <h4>Comments:</h4>
      <form onSubmit={addComment} >
        <TextField
          label='Comment'
          variant='outlined'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <br/>
        <br/>
        <Button variant="contained" color="primary" type='submit'>Add Comment</Button>
        <br/>
        <br/>
      </form>
      {
        blog.comments.map((comment,idx) => <li key={idx}>{comment}</li>)
      }

    </div>
  )
}

export default BlogView