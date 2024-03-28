import CountryInfo from "./CountryInfo"

const SearchResponse = ({filteredCountry, setCountryValue}) => {

    const handleShow = (countryName) => {
        setCountryValue(countryName)
    }

    if(filteredCountry.length > 10){
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if(filteredCountry.length == 1){
        return (
            <CountryInfo country={filteredCountry[0]} />
        )
    }
    else{
        return (
            <div>
                {filteredCountry.map(country => <div key={country.name.common}>{country.name.common}<button onClick={() => handleShow(country.name.common)}>show</button></div>)}
            </div>
        )
    }
}

export default SearchResponse