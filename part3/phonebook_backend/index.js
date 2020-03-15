/* eslint-disable consistent-return */
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

let personList = null

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

// Morgan konsollformat
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :res[content-length] :body :req[content-length]'))
// Database getters and setters
app.get('/info', async (request, response) => {
  await Person.find({}).then((persons) => {
    personList = persons.map((person) => person.toJSON())
  })
  console.log(personList)
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  response.write(`<p>Phonebook has info for ${personList.length} people</p><br/>`)
  response.write(new Date().toString())
  response.end()
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    personList = persons.map((person) => person.toJSON())
    res.json(persons.map((person) => person.toJSON()))
    console.log(personList)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})
app.post('/api/persons', (req, res, next) => {
  const { body } = req
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then((savedPerson) => {
    res.json(savedPerson.toJSON())
  })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

// Config
const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

// Feilmeldinger - middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name) {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
