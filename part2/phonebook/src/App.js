import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'
const Notification = ({message, level}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={level===0?'error':'warning'}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')
  const [ searchResult, setSearchResult ] = useState([])
  const [ isSearch, setIsSearch ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(null)
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
      if (window.confirm(`${newNumber} is already added to phonebook, replace the old number with a new one?`)) {
        setNewName('')
        setNewNumber('')
        personService
          .update(find.id, { ...find, number: newNumber})
          .then(returnedPerson => {
            console.log('update returnedPerson', returnedPerson);
            setPersons(persons.map(person => person.id !== find.id ? person : returnedPerson))
            setErrorMessage(
              `Update ${find.name} phone success`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Infomation of ${find.name} has already been removed from server`
            , 1)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== find.id))
          })
      }
    } else {
      personService
        .create({name: newName, number: newNumber})
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(
            `Add ${newName} success`, 0)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('create error:', error.response.data);
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
                setErrorMessage(
                  `Delete success`, 0
                )
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
            })
    } else {
        console.log('Cancel button clicked');
    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
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