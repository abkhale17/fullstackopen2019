const Router = require('express').Router()
const Blog = require('../models/blog')

Router.get('/', (req, res) => {
	Blog.find({}).then((blogs) => {
		res.json(blogs)
	})
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

module.exports = Router