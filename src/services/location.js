const weatherAPIUrl = process.env.WEATHER_SERVICE_URL
const weatherAPIKey = process.env.WEATHER_SERVICE_KEY
import * as Request from "../utils/request.js";
import { Api400Error, Api404Error, BaseError } from "../utils/errors.js";

export async function getLocationByIP(url) {
    try {
        if(url){
            const response = await Request.get(url);
            if(response && response.data) {

                return { lat: response.data.lat, lon: response.data.lon, city: response.data.city, province: response.data.regionName, country: response.data.country }
            } else {
                throw new Api404Error("services.js (getLocationByIP): Error trying to get Location by IP");
            }
        } else {
            throw new Api400Error("services.js (getLocationByIP): Param URL not found");
        }
    } catch(error) {
        console.error(error);
        if(error instanceof BaseError){
            throw error
        }
        throw { error, message: "services.js (getLocationByIP): Error trying to get location by ip" };
    }
}

export async function getCurrentWeather(query) {
    try {
        if(query) {
            const weatherURL = `${weatherAPIUrl}?key=${weatherAPIKey}&q=${query}`;
            const response = await Request.get(weatherURL);
            return response.data ?? null;
        } else {
            throw new Api400Error("services.js (getCurrentWeather): Param query not found");
        }
    } catch(error) {
        console.log("services.js (getCurrentWeather):", error);
        if(error instanceof BaseError){
            throw error
        }
        throw { error, message: "services.js (getCurrentWeather): Error trying to get current weather"};
    }
}