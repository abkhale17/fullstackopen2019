import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBtn = {
    background:'#8080ff', 
    color: '#fff',
  }

  const removeBtn = {
    background:'#cc5656',
    color:'#fff',
  }

  const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)} style={likeBtn}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<button onClick={() => handleRemove(blog.id)} style={removeBtn}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Blog