const Router = require('express').Router()
const Blog = require('../models/blog')

Router.get('/', (req, res) => {
	Blog.find({}).then((blogs) => {
		res.json(blogs)
	})
})

Router.post('/', (req, res, next) => {
  const body = req.body

  const blog = new Blog({...body})
  
  blog.save()
    .then(savedBlog => {
      res.json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = Router