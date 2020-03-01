import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplaySpecificCountry from './components/DisplaySpecificCountry';
import DisplayCountries from './components/DisplayCountries';


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const countriesToShow = countries.filter(country => country.name.toLowerCase().startsWith(filterCountry))

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
 
  const display = () => {
    if (filterCountry === '') return;

    if (countriesToShow.length > 10){
      return (
        <div>Too many matches, specify another filter</div>
      )
      
    } else if (countriesToShow.length === 1){
      return (
        <DisplaySpecificCountry country={countriesToShow[0]} />
      )

    } else {
      return (
        <DisplayCountries countries={countriesToShow} />
      )
    }
  }
  return (
    <div>
      Search for a country<br></br>
      <input value={filterCountry} onChange={handleChange}/>
      <div>
        {display()}
      </div>
    </div>
  )
}

export default App;
