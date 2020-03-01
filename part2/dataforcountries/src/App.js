import React, {useEffect, useState} from 'react';
import axios from 'axios';


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  const handleChange = (event) => {
    setFilterCountry(event.target.value.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })

  },[])
 

  const countriesToShow = countries.filter(country => country.name.toLowerCase().startsWith(filterCountry))
 
  const displayCountries = () => countriesToShow.map((country, i) => {
    return (
      <li key={i}>{country.name}</li>
    )
  })

  const displaySpecificCountry = () => countriesToShow.map((country, i) => {
    const languageList = country.languages.map(language => <li key={language.name}>{language.name}</li>)
    return (
      <div key={i}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>{languageList}</ul>
        <img src={country.flag} alt="flag" height="100px" width="150px"/>
      </div>
    )
  })

  const display = () => {
    if (filterCountry === '') return;

    if (countriesToShow.length > 10){
      return (
        <div>Too many matches, specify another filter</div>
      )
      
    } else if (countriesToShow.length === 1){
      return (
        displaySpecificCountry()
      )

    } else {
      return (
        displayCountries()
      )
    }
  }
  return (
    <div>
      Search for a country<br></br>
      <input 
        value={filterCountry}
        onChange={handleChange}
        />
      <div>
        {display()}
      </div>
    </div>
  )
}

export default App;
