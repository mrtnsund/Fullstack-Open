const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request;

    const existingUser = await User.find({ username: body.username });
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique ' });
    }
    console.log(body)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'something went wrong...' });
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    });
    response.json(users.map((u) => u.toJSON()));
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
