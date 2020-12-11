import React from 'react'

const UserBlog = ({ matchedUser }) => {
 
  if(!matchedUser) {
    return null
  }
  return (
    <div>
      <h1>{matchedUser.name}</h1>
      <h3>Added Blogs</h3>
      {
        matchedUser.blogs.map((blog, idx) => <li key={idx}>{blog.title}</li>)
      }
    </div>
  )
}

export default UserBlog