import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }
  return (
    <form onSubmit={addBlog} id='form'>
      <div>
        title
        <input
          id='title'
          minLength="3"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div>
        author
        <input
          id='author'
          minLength="3"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
      </div>
      <div>
        url
        <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          id='likes'
          type="number"
          value={likes}
          name="likes"
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button id="createBlog" type="submit">Create</button>
    </form>
  )
}

export default BlogForm