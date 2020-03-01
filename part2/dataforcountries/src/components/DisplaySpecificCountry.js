import React from 'react'
import Weather from './Weather'

const Header = ({text}) => <h1>{text}</h1>
const Content = ({text, value}) => <p>{text} {value}</p>
const SubHead = ({text, extra}) => <h3>{text}{extra}</h3>

const DisplaySpecificCountry = ({country}) =>  {

    const languageList = country.languages.map(language => <li key={language.name}>{language.name}</li>)
    return (
      <div>
        <Header text={country.name} />
        <Content text="capital" value={country.capital} />
        <Content text="population" value={country.population} />
        <SubHead text="languages" />
        <ul>{languageList}</ul>
        <img src={country.flag} alt="flag" height="100px" width="150px"/>
        <SubHead text="Weather in " extra={country.capital}/>
        <Weather country={country} />
      </div>
    )
  }

export default DisplaySpecificCountry