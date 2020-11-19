import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const LoginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-btn" type="submit">login</button>
        </form>
      </div>
    )
  }

  const addBlog = (newObj) => {
    blogService
      .create(newObj)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setIsError(false)
        setNotification(`A new Blog ${blog.title} by ${blog.author} was added!` )
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
      .catch( () => {
        setNotification('Something went wrong')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const renderBlogs = () => (
    <Togglable buttonLabel = "create a new blog">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login( { username, password, })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setIsError(false)
      setNotification('Logged in successfully!')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } catch (exception) {
      setNotification('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
    LoginForm()
  }

  const incrementLike = (id) => {
    const blog = blogs.find(b => b.id === id)

    const updateBlogLikes = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, updateBlogLikes)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch( err => console.log(err))
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    if(window.confirm(`Remove Blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          var blogsWithDel = [...blogs]
          var index = blogsWithDel.indexOf(blog)
          if( index !== -1) {
            blogsWithDel.splice(index,1)
            setBlogs(blogsWithDel)
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} error = {isError} />
      {
        user === null
          ? LoginForm()
          :
          <div>
            <p>{user.username} is logged in</p>
            <button onClick = {handleLogout}>Logout</button>
            <h5>Create New</h5>
            {renderBlogs()}
          </div>
      }
      <h2>blogs</h2>
      {
        blogs.sort((b1, b2) => b2.likes - b1.likes)
          .map((blog, i) =>
            <Blog key={i} blog={blog} incrementLike={() => incrementLike(blog.id)} deleteBlog={() => deleteBlog(blog.id)} user = {user}/>
          )
      }
    </div>
  )
}

export default App