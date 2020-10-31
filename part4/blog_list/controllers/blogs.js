const Router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

Router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
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

  const users = await User.find({})
  //any user from the database is designated as its creator
  const userTemp = users[Math.floor(Math.random() * users.length)]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: userTemp.id
  })
  
  const savedBlog = await blog.save()
  userTemp.blogs = userTemp.blogs.concat(savedBlog._id)
  await userTemp.save()
  res.json(savedBlog)
})

Router.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

Router.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {...body}

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = Router