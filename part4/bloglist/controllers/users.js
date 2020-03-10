const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request

    if (body.passwordHash.length > 3 && body.username.length > 3) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
    } else {
      response.status(401).json({ error: 'too short password and/or username' })
    }
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map((u) => u.toJSON()))
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter
