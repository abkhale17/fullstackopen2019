/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogTest = ({ blog, incrementLike }) => {
  const [view, setView] = useState(false)

  const label = view ? 'hide' : 'view'
  const visibility = () => setView(!view)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        </div>
      }
    </div>
  )
}

BlogTest.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLike: PropTypes.func.isRequired,
}

export default BlogTest
