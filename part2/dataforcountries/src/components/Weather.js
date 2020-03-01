import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        axios
        .get("http://api.weatherstack.com/current?access_key=c4791db67d1a63f4f06e447d047e3b05&query=" + country.capital)
        .then(response => {
            setWeather(response.data)
        })
    }, [country])
    console.log(weather)
    return (
        <div>
            
        </div>
    )
}

export default Weather