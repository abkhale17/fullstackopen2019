const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res ) => {
  const response = await User.find({})
  res.json(response)
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

module.exports = usersRouter