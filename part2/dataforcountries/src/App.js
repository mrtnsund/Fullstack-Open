import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DisplaySpecificCountry from './components/DisplaySpecificCountry';
import DisplayCountries from './components/DisplayCountries';
import { TextField, Grid } from '@material-ui/core'
import 'typeface-roboto'


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
    <div style={{padding: '20px'}}>
      <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
        <TextField variant="outlined" label="Search for a country" value={filterCountry} onChange={handleChange}></TextField>
        {display()}
      </Grid>
    </div>
  )
}

export default App;
