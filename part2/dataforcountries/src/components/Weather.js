import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
        .get("https://api.openweathermap.org/data/2.5/weather?q="+country.capital+"&APPID=a85717f57b6bd30e011747de59dc3a60&units=metric")
        .then(response => {
            setWeather(response.data.weather[0])
        })
    }, [country])
    var iconurl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
        <div>
            
            <img src={iconurl} alt="icon" />
            <p>{weather.description}</p>

            </div>
    )
}
export default Weather