import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {weatherToken} from './Token'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
        .get("https://api.openweathermap.org/data/2.5/weather?q="+country.capital+"&APPID="+weatherToken+"&units=metric")
        .then(response => {
            setWeather(response.data.weather[0])
        })
    }, [country])
    var iconurl = "https://openweathermap.org/img/wn/" + weather.icon + ".png";
    return (
        <div>
            <img src={iconurl} alt="icon" className="inline" />
            <p>{weather.description}</p>
        </div>
    )
}
export default Weather