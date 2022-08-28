const IPAPI_URL = process.env.IPAPI_URL;
const weatherAPIUrl = process.env.WEATHER_SERVICE_URL
const weatherAPIKey = process.env.WEATHER_SERVICE_KEY
import * as Request from "../utils/request";

const full_url_with_ip = IPAPI_URL + "200.51.255.3";

async function getLocationByIP(url) {
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

describe("Location tests", () => {

    test("get location from ip_api", async () => {
        const response = await getLocationByIP(full_url_with_ip); 
        expect(response.lat).toBeDefined();
        expect(response.lon).toBeDefined();
    });

    test("get null value if url is not passed", async () => {
        const response = await getLocationByIP();
        expect(response).toBeNull()
    })

});

describe("Get weather", () => {

    async function getCurrentWeather(query) {
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

    test("by location", async () => {
        const { lon, lat } = await getLocationByIP(full_url_with_ip);
        const query = lat+","+lon;
        const response = await getCurrentWeather(query);
        expect(response.current).toBeDefined();
        expect(response.location.country).toBe("Argentina");
    });

    test("by city", async () => {
        const response = await getCurrentWeather("Manchester");
        expect(response.current).toBeDefined();
        expect(response.location.country).toBe("United Kingdom");
    })
})