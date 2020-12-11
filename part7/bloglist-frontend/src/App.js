import React, { useState, useEffect, useRef } from 'react'
import {
  useRouteMatch,
  Switch, Route,
} from "react-router-dom"
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import User from './components/User'

import { initializeBlogs } from './reducers/blogsReducer'
import loginService from './services/login'
import storage from './utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { loggedUser, logout } from './reducers/userReducer'
import { initializeUserList } from './reducers/userListReducers'
import UserBlog from './components/UserBlogs'
import BlogView from './components/BlogView'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const userList = useSelector(state => state.userList)
  const user = useSelector(state => state.user)
  const matchUser = useRouteMatch('/users/:id')
  const matchBlog = useRouteMatch('/blogs/:id')
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(loggedUser(user))
  }, [dispatch])

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification({
      message, type
    }, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(loggedUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(a => a.id === id)
    dispatch(likeBlog(blogToLike))
    notifyWith(`You liked ${blogToLike.title}`)
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if(ok) {
      dispatch(removeBlog(blogToRemove.id))
      notifyWith(`You deleted ${blogToRemove.title}`)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const matchedUser = matchUser ? userList.find(user => user._id === matchUser.params.id) : null
  const matchedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null
  console.log(matchedUser,'matchUser')
  console.log(matchedBlog,'matchBlog')
  return (  
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Switch>
        <Route exact path='/'>

          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog blogFormRef={blogFormRef}/>
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </Route>
        <Route exact path='/users'>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Blogs Created</th>
              </tr>
              {userList.map((user, idx) => 
                <User
                  key={idx}
                  user={user}
                />
              )}
            </tbody>
          </table>
        </Route>
        <Route exact path='/users/:id'>
          <UserBlog matchedUser={matchedUser}/>
        </Route>
        <Route exact path='/blogs/:id'>
          <BlogView 
            blog={matchedBlog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={ matchedBlog ? user.username === matchedBlog.user.username : false  }
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App