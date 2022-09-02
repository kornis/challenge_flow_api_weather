import { getLocationByIP, getCurrentWeather, get5daysForecast } from "../../services/location.js";
import * as Response from "../../utils/response.js";
import { getIPfromClientOrMock } from "../../utils/helpers.js";
import { BaseError } from "../../utils/errors.js";
const IPAPI_URL = process.env.IPAPI_URL;

export default {

    getLocationByIp: async (req, res) => {
        try {
            
            let urlWithDomain = getIPfromClientOrMock(req, IPAPI_URL);
            
            const response = await getLocationByIP(urlWithDomain);

            if(response){
                Response.OK(res, response)
            } else {
                Response.APIERROR(res, "Error trying to get location by IP", 400);
            }
        } catch(error) {
            console.log(error);
            if(error instanceof BaseError) {
                return Response.APIERROR(res, error.message, error.statusCode);
            }
            return Response.FAIL(res, "Internal error, try again later")
        }
    },

    currentWeather: async (req, res) => {
        try {

            const urlWithDomain = getIPfromClientOrMock(req, IPAPI_URL);
            
            let query;
            
            if(req.params.city) {
                query = req.params.city;
            } else {
                const response = await getLocationByIP(urlWithDomain) 
                query = response.lat+","+response.lon;
            }

            const weather = await getCurrentWeather(query);
            
            if(weather && weather.current) {
                Response.OK(res, weather.current)
            } else {

                Response.APIERROR(res, "Location not found", 404);
            }
            
        } catch(error) {
            console.log(error);
            
            if(error instanceof BaseError) {
                return Response.APIERROR(res, error.message, error.statusCode);
            }
            return Response.FAIL(res, "Internal error, try again later")
        }
    },

    getForecast: async (req, res) => {
        try {

            const urlWithDomain = getIPfromClientOrMock(req, IPAPI_URL);
            
            let query;
            
            if(req.params.city) {
                query = req.params.city;
            } else {
                const response = await getLocationByIP(urlWithDomain) 
                query = response.lat+","+response.lon;
            }

            const weather = await get5daysForecast(query);
            
            if(weather) {
                Response.OK(res, weather)
            } else {

                Response.APIERROR(res, "Location not found", 404);
            }

        } catch(error){

            console.log(error);

            if(error instanceof BaseError) {
                return Response.APIERROR(res, error.message, error.statusCode);
            }
            return Response.FAIL(res, "Internal error, try again later")
        }
    }
}