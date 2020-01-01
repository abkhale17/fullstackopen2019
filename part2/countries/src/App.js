
import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import './index.css'


function App(){
  const [countries , setCountries]        = useState('')
  const [filterCountry,setFilterCountry]  = useState([])
  const [result,  setResult]              = useState('')
  const [city_weather, setCityWeather]    = useState([])
  const YOUR_ACCESS_KEY                   = '69bd1a4e0a52fc80a84109eb23d3d555'

  useEffect(()  =>  { 
    if (countries===''){
        setFilterCountry([])
        setResult('')
        return
      }

    axios.get(`https://restcountries.eu/rest/v2/name/${countries}`)  
    .then( response => {
    	
      if (response.data.length > 10 ){
        setResult('too many matches, filter another')
      }
      else {
        setFilterCountry(response.data)
        setResult('')
      }
    })
    .catch( error => {
        console.log('error while fetching country')
        setFilterCountry([])          
    })

    axios
    .get(`http://api.weatherstack.com/current?access_key=${YOUR_ACCESS_KEY}&query=${countries}`)
    .then( response => {
        setCityWeather(response.data)                                            
      })
    .catch( error => {
        console.log('error while fetching weather')
      })
  },  [ countries , result ])


	function handleChange(event) {
    setCountries(event.target.value)   
  }


  function show_clicked_country(country) {
    setFilterCountry([country])
    setResult('')
  }
  
	return(

      <div>
				find countries <input value={countries} onChange={handleChange}/>
        {
          result==='' ? 
          ( 
          filterCountry.length ===1 ?

              filterCountry.map((country,idx)=>

                <div key={idx}>
                  <h2>{country.name}</h2>
                  capital {country.capital}<br/>
                  population  {country.population}<br/>
                  <h2>languages</h2>
                  {
                    country.languages.map((lang,index)=>
                      <ul key={index}>
                        <li >{lang.name}</li>
                      </ul>
                      )
                  }
                  <img width={'150px'} height={'150px'} alt={country.name} src={country.flag} />
                  
                  <h2>weather in {country.capital}</h2>

                  { 
                    /* ==== weather ===== */

                    city_weather.current !== undefined ?
                      (
                        <div>
                          <h2>temperature:   <span >{city_weather.current.temperature} Celsius</span></h2>
                          <img width={'50px'} height={'50px'} alt={country.name} src={city_weather.current.weather_icons[0]} />
                          <h2> wind: <span>{city_weather.current.wind_speed} kph {city_weather.current.wind_dir}</span></h2>
                        </div>
                      )

                      : null
                  } 
                  
                </div>
              )
              : filterCountry.map((country,idx)=>
                    <li key={idx} >{country.name}
                    <button onClick={()=>show_clicked_country(country)}>show</button></li>
                )   
          )
          :  <li>{result}</li>
          
        }

			</div>	
		)
}

export default App




