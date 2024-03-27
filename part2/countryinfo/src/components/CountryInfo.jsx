import { useState, useEffect } from "react"
import axios from "axios"

const CountryInfo = ({country}) => {
    const baseURl = 'https://api.openweathermap.org/data/2.5/weather'
    const location = country.capital[0]
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const units = 'metric'

    const [temp, setTemp] = useState(null)
    const [icon, setIcon] = useState(null)
    const [wind, setWind] = useState(null)

    useEffect(() => {
        axios.get(`${baseURl}?q=${location}&units=${units}&appid=${apiKey}`)
        .then(response => {
            console.log(response.data)
            setTemp(response.data.main.temp)
            setWind(response.data.wind.speed)
            setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
        })
    }, [country])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h3>Languages: </h3>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h3>Weather in {location}</h3>
            <p>Temperature {temp} Celcius</p>
            <img src={icon} />
            <p>Wind {wind} m/s</p>
        </div>
    )
}

export default CountryInfo