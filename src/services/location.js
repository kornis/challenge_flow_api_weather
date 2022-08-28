const weatherAPIUrl = process.env.WEATHER_SERVICE_URL
const weatherAPIKey = process.env.WEATHER_SERVICE_KEY
import * as Request from "../utils/request.js";

export async function getLocationByIP(url) {
    try {
        if(url){
            const response = await Request.get(url);
            return response.data ? { lat: response.data.lat, lon: response.data.lon, city: response.data.city, province: response.data.regionName, country: response.data.country } : null;
        } else {
            return null;
        }
    } catch(error) {
        console.error(error);
        return error;
    }
}

export async function getCurrentWeather(query) {
    try {
        if(query) {
            const weatherURL = `${weatherAPIUrl}?key=${weatherAPIKey}&q=${query}`;
            const response = await Request.get(weatherURL);
            return response.data ?? null;
        } else {
            return null
        }
    } catch(error) {
        console.log(error);
    }
}