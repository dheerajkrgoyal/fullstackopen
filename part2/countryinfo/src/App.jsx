import { useState, useEffect } from "react"
import axios from "axios"
import SearchResult from "./components/SearchResult"

const App = () => {

  const [allCountries, setAllCountries] = useState(null)
  const [countryValue, setCountryValue] = useState('')
  const [filteredCountry, setFilteredCountry] = useState([])

  useEffect(() => {
    if(!allCountries){
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => {
          console.log(response.data[0])
          setAllCountries(response.data)
        })
    }
  },[])

  useEffect(() => {
    if(allCountries){
      if(countryValue.length === 0){
        setFilteredCountry([])
      }
      else{
        setFilteredCountry(allCountries.filter(country => country.name.common.toLowerCase().includes(countryValue.toLowerCase())))
      }
    }
  },[countryValue])

  const handleCountryValue = (event) => {
    setCountryValue(event.target.value)
  }

  return (
    <div>
        Find Countries: <input value={countryValue} onChange={handleCountryValue} />
        <SearchResult filteredCountry={filteredCountry} setCountryValue={setCountryValue} />
    </div>
  )
}

export default App