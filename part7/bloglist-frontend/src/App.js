import React, { useEffect, useRef } from 'react'
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
import storage from './utils/storage'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { loggedUser, logout } from './reducers/userReducer'
import { initializeUserList } from './reducers/userListReducers'
import UserBlog from './components/UserBlogs'
import BlogView from './components/BlogView'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'

//@material/core imports
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
} from '@material-ui/core'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const userList = useSelector(state => state.userList)
  const user = useSelector(state => state.user)
  const matchUser = useRouteMatch('/users/:id')
  const matchBlog = useRouteMatch('/blogs/:id')
  const dispatch = useDispatch()

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

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#ff5722',
      },
      secondary: {
        main: '#6200ea',
      },
    },
  });

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification({
      message, type
    }, 5))
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
      <LoginForm notifyWith={notifyWith}/>   
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const matchedUser = matchUser ? userList.find(user => user._id === matchUser.params.id) : null
  const matchedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  return (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <div>
          <Menu 
            user={user} 
            handleLogout={handleLogout}
          />
          
          <Notification />

          <Switch>
            <Route exact path='/'>

              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog blogFormRef={blogFormRef}/>
              </Togglable>

              <h2>blogs</h2>

              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {blogs.sort(byLikes).map(blog =>
                      <Blog
                        key={blog.id}
                        blog={blog}
                      />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Route>
            <Route exact path='/users'>
              <h2>Users</h2>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Blogs Created</TableCell>
                    </TableRow>
                    {userList.map((user, idx) => 
                      <User
                        key={idx}
                        user={user}
                      />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Route>
            <Route exact path='/users/:id'>
              <UserBlog matchedUser={matchedUser}/>
            </Route>
            <Route exact path='/blogs/:id'>
              <BlogView 
                blog={matchedBlog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                notifyWith={notifyWith}
                own={ matchedBlog ? user.username === matchedBlog.user.username : false  }
              />
            </Route>
          </Switch>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App