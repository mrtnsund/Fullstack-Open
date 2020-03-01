import React from 'react'


const DisplayCountries = ( {countries} ) => 
    countries.map((country, i) => {
    return (
      <li key={i}>{country.name}</li>
    )
  })


export default DisplayCountries