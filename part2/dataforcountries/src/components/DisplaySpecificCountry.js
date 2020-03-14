import React from 'react'
import Weather from './Weather'
import '../css/output.css'


// const Header = ({text}) => <h1>{text}</h1>
// const Content = ({text, value}) => <p>{text} {value}</p>
// const SubHead = ({text, extra}) => <h3>{text}{extra}</h3>


const DisplaySpecificCountry = ({country}) =>  {

    const languageList = country.languages.map(language => <li key={language.name}>{language.name}</li>)
    return (
          <div className="bg-white rounded-lg overflow-hidden flex flex-col">
            <div className="content-center">
              <img src={country.flag} alt="flag" className="w-32 rounded-md inline"/>
            </div>
            <h3 className="font-semibold text-lg leading-tight truncate">{country.name}</h3> 
            <p className="font-sans">Capital - {country.capital}</p>
            <p className="font-sans">Population - {country.population}</p>
            <p className="font-sans font-semibold pt-5">Languages</p>
            <ul>
              {languageList}
            </ul>
            <p className="font-sans font-semibold pt-5">Weather in {country.capital}</p>
            <Weather country={country} />
          </div>
    )
  }

export default DisplaySpecificCountry
/* <Header text={country.name} />
<Content text="capital" value={country.capital} />
<Content text="population" value={country.population} />
<SubHead text="languages" />
<ul>{languageList}</ul>
<img src={country.flag} alt="flag" height="100px" width="150px"/>
<SubHead text="Weather in " extra={country.capital}/>
<Weather country={country} /> */