import React, { useState, useEffect }  from 'react';
import axios from 'axios'

const SingleCountry = (props) => {
  const languages = props.country.languages.map(
    language => <li key={language.name}>{language.name}</li>)
  return (
    <div>
      <h2>{props.country.name}</h2>
      <p>captial {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={props.country.flag} alt="country logo" height="100" width="100" />
    </div>
  )
}

const Show = (props) => {
  if (props.countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
 } else if (props.countries.length > 1) {
   return props.countries.map(country => <p key={country.name}>{country.name}</p>)
 } else if (props.countries.length === 1) {
   return <SingleCountry country={props.countries[0]}/>
 } else {
   return (
     <div>
       {/* <p>No result find</p> */}
     </div>
   )
 } 
}

const App = (props) => {
  const [searchKey, setSearchKey ] = useState('')
  const [result, setResult ] = useState([])

  const handleInputOnChange = (event) => {
    const key = event.target.value
    console.log(key);
    setSearchKey(key)
  }

  useEffect(
    () => {
      if (searchKey.length > 0) {
        // send search request
        axios
          .get(`https://restcountries.eu/rest/v2/name/${searchKey}`)
          .then(response => {
            console.log(response.data)
            setResult(response.data)
          })
      } else {
        setResult([])
      }
    },
    [searchKey]
  )

  return (
    <div>
        find countries <input value={searchKey} onChange={handleInputOnChange}/> <br/>  
        <Show countries={result}/>
    </div>
  )
}

export default App;
