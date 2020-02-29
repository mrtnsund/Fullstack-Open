import React, {useState} from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')

    const displayAll = () => persons.forEach(p => <p>{p}</p>)
  
    const addNewPerson = () => {
        const person = {
            name: {newName}
        }
        setPersons(persons.concat(person));
        setNewName('');
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
            <button type="submit"> add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {displayAll()}
      </div>
    )
  }
  
  export default App