import React, { useState, useEffect } from 'react'
//Components
import Person from './components/Person'
import Notification from './components/Notification'
//Service
import personService from './services/persons'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const numbersToDisplay = (filter.length === 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const displayAll = () => numbersToDisplay.map((person, i) => {
    return (
      <Person
        key={i}
        person={person}
        onSubmit={() => deletePerson(person.id)}
        />      
    )
  })

  const addNewPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updateNumber(person)
      }
    }
    else {
      personService
        .create(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newPerson.name}`)
        })
    }
  }
  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService
        .deleteEntry(id)
        .then(
            setPersons(persons => persons.filter(person => person.id !== id))
          )
          setNotification(`Deleted ${personToDelete.name}`)
    }
  }
  const updateNumber = (props) => {
    const personToBeUpdated = persons.find(p => p.name === props.name);
    const changedPerson = { name: personToBeUpdated.name, number: props.number}

    personService
      .update(personToBeUpdated.id,changedPerson)
      .then(person => {
        setPersons(persons => persons.filter(person => person.id !== personToBeUpdated.id))
      })
      setPersons(persons.concat(changedPerson))
      setNotification(`Changed ${changedPerson.name}`)
    
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
      <Notification message={notification} />
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