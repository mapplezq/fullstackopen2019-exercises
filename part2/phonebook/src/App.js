import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ isSearch, setIsSearch ] = useState(false)

  const numbersToShow = isSearch ? searchResult : persons

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        setPersons(response.data)
      })
  }, [])

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchKey={searchKey} handleSearchInput={handleSearchInput}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNewNameInput={handleNewNameInput}
      newNumber={newNumber} handleNewNumberInput={handleNewNumberInput}
      addNewPerson={addNewPerson}/>
      <h3>Numbers</h3>
      <Persons numbersToShow={numbersToShow}/>
    </div>
  )
}

export default App