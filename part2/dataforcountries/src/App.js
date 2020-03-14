import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplaySpecificCountry from './components/DisplaySpecificCountry';
import DisplayCountries from './components/DisplayCountries';
import './css/output.css'
// import './css/debugger.css'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const countriesToShow = countries.filter(country => country.name.toLowerCase().startsWith(filterCountry))

  const handleChange = (event) => {
    setFilterCountry(event.target.value.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
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
      <div className="container mx-auto py-5">
          <input 
          type="text" 
          value={filterCountry} 
          onChange={handleChange}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-center"
          placeholder="Søk etter land"
          />
      </div>
      <div className="container mx-auto">
        <ul className="list-none text-center">
        {display()}
        </ul>
      </div>
    </div>
  )
}

export default App;
