import React from 'react'
import DisplaySpecificCountry from './DisplaySpecificCountry'

const DisplayCountries = ( {countries} ) => 
    countries.map((country, i) => {
    return (
    <div>
      <li key={i}>{country.name}</li>
    </div>
    )
  })


export default DisplayCountries