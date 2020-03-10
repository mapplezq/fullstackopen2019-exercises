import React, { useState, useEffect }  from 'react';
import axios from 'axios'


const SingleCountry = (props) => {
  const languages = props.country.languages.map(
    language => <li key={language.name}>{language.name}</li>)
    console.log('sss: ', props.country);
    
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>captial {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={props.country.flag} alt="country logo" height="100" width="100" />
      <h2>Weather in {props.country.capital}</h2>
      <p><b>temperature:</b> {props.country.current?props.country.current.temperature:''} Celsius </p>
      <img src={props.country.current?props.country.current.weather_icons:''} alt="weather icon"/>
      <p><b>wind: </b>{props.country.current?props.country.current.wind_speed:''} kph direction {props.country.current?props.country.current.wind_dir:''}</p>
    </div>
  )
}

const CountryListItem = (props) => {
  const [showDetail, setShowDetail ] = useState(false)

  const showDetailBtnClick = (event) => {
    const clicked = !showDetail
    setShowDetail(clicked)
  }
  if(!showDetail) {
    return (
      <div>
          <label >{props.country.name}</label>
          <button onClick={showDetailBtnClick}>{showDetail?'hide': 'show'}</button>
      </div>
    )
  } else {
    return (
      <div>
          <label >{props.country.name}</label>
          <button onClick={showDetailBtnClick}>{showDetail?'hide': 'show'}</button>
          <SingleCountry country={props.country}/>
      </div>
    )
  }
  
}

const Show = (props) => {
  if (props.countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
 } else if (props.countries.length > 1) {
   return props.countries.map(country => 
      <CountryListItem  key={country.name} country={country} />
    )
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
    setSearchKey(event.target.value)
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

  // const whenToFetchWeather = result.length === 1

  useEffect(
    () => {
      // console.log('now: ',result);
      if (result.length === 1) {
        console.log('send weahter request');
      
        const country = result[0]
        axios
          .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.name}`)
          .then(response => {
            console.log("weather: ",response.data)
            // 插入当前对象里去
            const copy = [...result]
            copy[0] = Object.assign(response.data, copy[0])
            console.log('copy object: ', copy);
            setResult(copy)
          })
      } else {
        console.log('dddddd');
        
      }
      
    },
    [result.length === 1]
  )

  return (
    <div>
        find countries <input value={searchKey} onChange={handleInputOnChange}/> <br/>  
        <Show countries={result}/>
    </div>
  )
}

export default App;
