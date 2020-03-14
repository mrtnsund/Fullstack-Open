import React, {useState} from 'react'
import DisplaySpecificCountry from './DisplaySpecificCountry'
import '../css/output.css'


const DisplayCountries = ( {countries} ) => {
  const [index, setIndex] = useState(null)
  if (index !== null){
    return (
      <DisplaySpecificCountry country={countries[index]} />
    )
  } else {
    return (
    countries.map((country, i) => 
    <li className="py-2" key={i}>{country.name}
      <button key={country.name}className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow text-xs" onClick={() => setIndex(i)}>
        show
      </button>
    </li>)
    )
  }
}
export default DisplayCountries