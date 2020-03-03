const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

app.use(bodyParser.json())

morgan.token('body', function (req, res){
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :response-time ms :res[content-length] :body :req[content-length]'))



let persons = [
    {
        name: "Morten Sund",
        number: 41596565,
        id: 1
    },
    {
        name: "Hanna Brodersen",
        number: 95261243,
        id: 2
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    } else if (persons.find(person => (person.name === body.name || person.number === body.number))){
        return res.status(400).json({
            error: 'name or number already in use'
        })
    } else {
        const person = {
            name: body.name,
            number: body.number,
            id: Math.floor(Math.random()*999999)
        }
        persons=persons.concat(person)
        res.json(person)
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people<p><br/>${Date()}`)
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})