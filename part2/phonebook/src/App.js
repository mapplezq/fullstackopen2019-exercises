import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ isSearch, setIsSearch ] = useState(false)

  const numbersToSHow = isSearch ? searchResult : persons

  const handleNewNameInput = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNewNumberInput = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    console.log(event.target.value);
    setSearchKey(event.target.value)
    
    // debugger
    if (event.target.value.length > 0 ) {
      setIsSearch(true)
      const searchResult = persons.filter(person => {
        const o = person.name.toLowerCase()
        const s = event.target.value.toLowerCase()
        const r = o.includes(s)
        return r
      })
  
      setSearchResult(searchResult)
    } else {
      setIsSearch(false)
      setSearchResult([])
    }
  }

  const addNewPerson = (event) => {
    // debugger
    event.preventDefault()
    // clear search status
    setIsSearch(false)
    setSearchKey('')
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
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
          filter shown with: <input value={searchKey} onChange={handleSearchInput}/>
      </div>
      <h2>add a new</h2>
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
      {numbersToSHow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App