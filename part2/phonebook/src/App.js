import React, {useState} from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')

    const displayAll = () => persons.map((person,i) => {
      return (
        <p key={i}>{person.name}</p>
      )
    })
  
    const addNewPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)){
          alert(`${newName} is already added`)
        }
        else {
          const person = {
              name: newName
          }
          setPersons(persons.concat(person))
          console.log(persons)
          setNewName('');
      }
    }
    const handleChange = (event) => {
        setNewName(event.target.value)
    }
    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addNewPerson}>
          <div>
            name: <input value={newName} onChange={handleChange} />
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