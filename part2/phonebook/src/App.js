import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNewNameInput = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    // debugger
    event.preventDefault()
    // console.log(newName);
    console.log(typeof newName);
    const find = persons.find(({name}) => name === newName)
    console.log(find)
    if (find === undefined) {
      setPersons(persons.concat({name: newName}))
      setNewName('')
    } else {
      window.alert(newName + " is already added to phonebook")
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
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App