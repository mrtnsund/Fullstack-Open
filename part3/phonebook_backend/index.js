require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res){
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :response-time ms :res[content-length] :body :req[content-length]'))


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
    .then(person => {
        if(person){
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        res.status(404).send({error: 'malformatted id'})
    })
})
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    // } else if (persons.find(person => (person.name === body.name || person.number === body.number))){
    //     return res.status(400).json({
    //         error: 'name or number already in use'
    //     })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
            id: Math.floor(Math.random()*999999)
        })
        person.save().then(savedPerson => {
            res.json(savedPerson.toJSON())
        })
    }
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})