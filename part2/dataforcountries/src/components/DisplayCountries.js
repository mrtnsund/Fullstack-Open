import React from 'react'


const DisplayCountries = ( {countries} ) => 
    countries.map((country, i) => <li className="py-1" key={i}>{country.name}</li>)


export default DisplayCountries