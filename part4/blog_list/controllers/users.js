const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res ) => {
  const response = await User.find({})
  res.json(response)
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if(body.password === undefined) {
    return res.status(400).json({ erro: "Password is missing"})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch {
    res.status(400).json({ error : "Invalid username or password"})
  }
})

module.exports = usersRouter