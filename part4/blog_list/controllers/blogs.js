const jwt = require('jsonwebtoken')
const Router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

Router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
  } catch(exception) {
    console.log(exception)
  }
})

Router.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  try {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch {
    next(error)
  }

})

Router.post('/', async (req, res, next) => {
  const body = req.body
  if(body.title === undefined || body.author === undefined) {
    return res.status(400).end()
  }
  if(body.likes === undefined) {
    body.likes = 0
  }
  
  if(!req.token) {
    return res.status(401).json({ error: 'token missing'})
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  console.log(decodedToken)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.json(savedBlog)
})

Router.delete('/:id', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).json({ error: 'token missing'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const blog = await Blog.findById(request.params.id)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if ( blog.user.toString() === decodedToken.id.toString() ) {
    Blog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  } else {
    return response.status(401).json({ error: 'Token is not matching with Blog creator' })
  } 
})

Router.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {...body}
  console.log(request.params.ids,"---in put body")
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => {
      console.log(error,"---in put err")
      next(error)
    })
})

module.exports = Router