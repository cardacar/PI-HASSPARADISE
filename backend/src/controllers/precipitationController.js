import fetch from 'node-fetch';

const URL_API_WEATHER = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY_WEATHER = "06762c9c763197b10f30312fcd78d7c8"

export const getPrecipitation = async (req, res) => {
    const latitude = '5.689333256489724', longitude = '-75.17554532853384';
    const response = await fetch(`${URL_API_WEATHER}?lat=${latitude}&lon=${longitude}&lang=sp,es&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY_WEATHER}`);
    const data = await response.json();
    let dailyWeather = []
    data.daily.forEach((element, index) => {
        const unixTime = element.dt
        const date = new Date(unixTime* 1000).toISOString().split("T")[0]
        //const dateSplit = date.split('T')[0]
        let oneDaily = {
            temp:element.temp.day,
            day: date,
            humidity: element.humidity,
            pressure: element.pressure,
            windSpeed: element.wind_speed,
            dayWeatherDesc: element.weather[0].main,
            icon: element.weather[0].icon
        }
        dailyWeather.push(oneDaily)
    });

    res.send({dailyWeather});
}
