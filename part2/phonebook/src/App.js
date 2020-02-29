import React, {useState} from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
      { 
        name: 'Arto Hellas',
        number: '12345678'
      }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const displayAll = () => persons.map((person,i) => {
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
    return (
      <div>
        <h2>Phonebook</h2>
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