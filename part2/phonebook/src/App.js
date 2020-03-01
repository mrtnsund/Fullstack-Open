import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
    }, [])
    console.log('render', persons.length, 'people')

    const numbersToDisplay = (filter.length===0) 
      ? persons
      : persons.filter(person => person.name.includes(filter))

    const displayAll = () => numbersToDisplay.map((person,i) => {
      return (
        <p key={i}>{person.name} {person.number}</p>
      )
    })
  
    const addNewPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)){
          alert(`${newName} is already added`)
        }
        else {
          const person = {
              name: newName,
              number: newNumber
          }
          setPersons(persons.concat(person))
          setNewName('');
      }
    }
    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const handleChangeFilter = (event) => {
        setFilter(event.target.value)
    }
    return (
      <div>
        <h2>Phonebook</h2>
          <div>
            filter shown with: <input value={filter} onChange={handleChangeFilter} />
          </div>
        <h2>add a new</h2>
        <form onSubmit={addNewPerson}>
          <div>
            name: <input value={newName} onChange={handleChangeName} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleChangeNumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {displayAll()}
      </div>
    )
  }
  
  export default App