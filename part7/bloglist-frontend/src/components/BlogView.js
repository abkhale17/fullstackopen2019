import React from 'react'

const BlogView = ({ blog, handleLike, handleRemove, own }) => {
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
      {
        blog.comments.map((comment,idx) => <li key={idx}>{comment}</li>)
      }

    </div>
  )
}

export default BlogView