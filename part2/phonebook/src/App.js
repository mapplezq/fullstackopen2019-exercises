import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ isSearch, setIsSearch ] = useState(false)

  const numbersToShow = isSearch ? searchResult : persons

  useEffect(() => {
    personService
      .getAll()
      .then(originPersons => {
        console.log(originPersons);
        setPersons(originPersons)
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
      personService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const deleteBtnClick = (id, event) => {
    console.log(event)
    console.log('id is', id)
    if (window.confirm(`Delete cxxx`)) {
        console.log('Ok button clicked');
        personService
            .deletePerson(id)
            .then(returnedPerson => {
                console.log('retun ', returnedPerson);
                setPersons(persons.filter(person => person.id !== id))
            })
    } else {
        console.log('Cancel button clicked');
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
      <Persons numbersToShow={numbersToShow} deleteBtnClick={deleteBtnClick}/>
    </div>
  )
}

export default App