import { getLocationByIP, getCurrentWeather } from "../services/location.js";
import * as Response from "../utils/response.js";
const IPAPI_URL = process.env.IPAPI_URL;

export default {

    getLocationByIp: async (req, res) => {
        try {
            
            let ipapiURLwithIP = IPAPI_URL;

            // Si se está realizando la prueba desde localhost, usamos una ip random para devolver coordenadas
            if((/localhost:/).test(req.headers.host)){
                ipapiURLwithIP += "200.51.255.3";
            } else {
                // Leemos la ip desde la petición del usuario
                ipapiURLwithIP += req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            }
            
            const response = await getLocationByIP(ipapiURLwithIP);

            if(response){
                Response.OK(res, response.data)
            } else {
                Response.FAIL(res, "Error trying to get location by IP");
            }
        } catch(error) {
            console.log(error);

        }
    }
}