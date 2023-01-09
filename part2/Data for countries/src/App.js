import { useState, useEffect } from "react";
import axios from "axios";


const Input = ({ val, handle }) => {
  return (
    <>
      <input value={val} onChange={evt => handle(evt.target.value)} />
    </>
  )
}


const Weather = ({ cityName }) => {
  console.log('start render Weather.')
  const [weather, setWeather] = useState({ main: { temp: 0 }, weather: [{ icon: '01d' }], wind: { speed: 0 } })
  const api = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}`)
      .then(res => setWeather(res.data))
      .catch(console.log)
  }, [])

  return (
    <>
      <h1>Weather in {cityName}</h1>
      <p>temperature {weather.main.temp - 273.15} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}


const Country = ({ goal }) => {
  return (
    <>
      <h1>{goal.name.common}</h1>
      <p>capital {goal.capital}</p>
      <p>area {goal.area}</p>

      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(goal.languages).map((lang, index) =>
          <li key={index}>{lang}</li>)}
      </ul>

      <img src={goal.flags.svg} alt={goal.name.common + 'flag'} width='30%' />
    </>
  )
}


const Display = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const len = filteredCountries.length
  if (filter === '') {
    return (
      <p>palease input some word.</p>
    )
  } else if (len > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (len > 1) {
    return (
      <ul>
        {filteredCountries.map((country, index) =>
          <li key={index}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </li>)}
      </ul>
    )
  } else if (len === 1) {
    return (
      <>
        <Country goal={filteredCountries[0]} />
        <Weather cityName={filteredCountries[0].capital} />
      </>
    )
  } else {
    return (
      <p>Sorry! We can's find such a country.</p>
    )
  }
}


const App = () => {
  console.log('start app')
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])
  
  return (
    <>
      <span>find countries </span><Input val={filter} handle={setFilter} />
      <Display countries={countries} filter={filter} setFilter={setFilter} />
    </>
  )
}

export default App