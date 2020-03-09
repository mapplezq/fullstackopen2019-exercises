import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewNameInput = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNewNumberInput = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    // debugger
    event.preventDefault()
    const find = persons.find(({name}) => name === newName)
    if (newName.length === 0) {
      window.alert(`name cannot be empty.`)
    } else if (newNumber.length === 0) {
      window.alert(`number cannot be empty.`)
    } else if (find !== undefined ) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberInput}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App