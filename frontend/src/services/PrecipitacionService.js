import axios from "axios";
import * as urlAPI from './URL'

//const URL_IPGEOLOCATION = 'https://api.ipgeolocation.io';
//const URL_API_WEATHER = 'https://api.openweathermap.org/data/2.5/onecall'
//const API_KEY_IPGEOLOCATION = "5d8c4b31fb4149269573ba6c5c16729f"
//const API_KEY_WEATHER = "06762c9c763197b10f30312fcd78d7c8"
//5.689333256489724, -75.17554532853384
//const latitude = '5.689333256489724', longitude = '-75.17554532853384';

export const getIp = async()=>{
    /* const response = await fetch(`${URL_IPGEOLOCATION}/ipgeo?apiKey=${API_KEY_IPGEOLOCATION}`)
    const data = response.json();
    console.log(data);
    return data; */
    /* const response = await fetch(`${URL_API_WEATHER}?lat=${latitude}&lon=${longitude}&lang=sp,es&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY_WEATHER}`);
    const data = await response.json(); */
    const response = await axios.get(`${urlAPI.baseUrl}precipitation`)

    console.log(response.data)
    return response.data;
}