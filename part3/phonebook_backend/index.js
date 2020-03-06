require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

//Morgan konsollformat
morgan.token('body', function (req, res){
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :response-time ms :res[content-length] :body :req[content-length]'))

//Database getters and setters
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if(person){
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    if (!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        })
        person.save().then(savedPerson => {
            res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, { new: true }, person)
    .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

//Config
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

//Feilmeldinger - middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name){
        return response.status(400).send({ error: 'feil' })
    }
    next(error)
}
app.use(errorHandler)
