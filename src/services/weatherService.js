import axios from 'axios';

const API_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getWeatherByCity(city) {
        const apiKey = "5c7094096ebe47aa81c104953230807";
        const url = `/current.json?key=${apiKey}&q=${city}&aqi=no`;
        return apiClient.get(url);
    },

    getForecastByCity(city, day) {
        const apiKey = "5c7094096ebe47aa81c104953230807";
        const url = `/forecast.json?key=${apiKey}&q=${city}&days=${day}&aqi=no&alerts=no`;
        return apiClient.get(url);
    }

};
