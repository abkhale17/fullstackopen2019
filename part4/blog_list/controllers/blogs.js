const Router = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

Router.get('/', (req, res) => {
	Blog.find({}).then((blogs) => {
		res.json(blogs)
  })
})

Router.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

Router.post('/', (req, res, next) => {
  const body = req.body
  if(body.title === undefined || body.author === undefined) {
    return res.status(400).end()
  }
  if(body.likes === undefined) {
    body.likes = 0
  }

  const blog = new Blog({...body})
  
  blog.save()
    .then(savedBlog => {
      res.json(savedBlog)
    })
    .catch(error => next(error))
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