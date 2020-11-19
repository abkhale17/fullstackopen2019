/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import userServce from '../services/user'

const Blog = ({ blog, incrementLike, deleteBlog, user }) => {
  const [view, setView] = useState(false)
  const [blogCreator, setblogCreator] = useState(null)

  const label = view ? 'hide' : 'view'
  const visibility = () => setView(!view)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog.user)
  const id = blog.user._id || blog.user
  console.log(id)
  userServce.getUserById(id).then( blogCreator => setblogCreator(blogCreator.username))

  return (
    <div className="displayBlog" style={blogStyle}>
      {!view ?
        <div className='defaultBlogView'>{blog.title} {blog.author} <button className="display" onClick={visibility}>{label}</button></div>
        :
        <div className='secondaryBlogView'>
          <p>{blog.title} - {blog.author} <button onClick={visibility}>{label}</button></p>
          <p>Url: {blog.url}</p>
          <p className='likesCount'>Likes: <span>{blog.likes}</span></p>
          <button onClick={incrementLike} id="like">Like</button>
          {
            user
              ? ( blogCreator === user.username )
                ? <button id="delete" onClick={deleteBlog}>Delete</button>
                : null
              :  null
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLike: PropTypes.func.isRequired,
}

export default Blog
