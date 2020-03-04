const mongoose = require('mongoose')

if ( process.argv.length < 3 ){
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]

const url =
`mongodb+srv://mrtnsund:${password}@cluster0-bq444.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology:true, useNewUrlParser: true } )

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})
const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const person = new Person({
        name: personName,
        number: Number(personNumber),
    })

    person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}