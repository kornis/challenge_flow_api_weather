const IPAPI_URL = process.env.IPAPI_URL;

import { getCurrentWeather, getLocationByIP, get5daysForecast } from "../services/location.js";

const full_url_with_ip = IPAPI_URL + "200.51.255.3";


describe("Location tests", () => {

    test("get location from ip_api", async () => {
        const response = await getLocationByIP(full_url_with_ip); 
        expect(response.lat).toBeDefined();
        expect(response.lon).toBeDefined();
    });

    test("throw error if url param is not passed", async () => {
        await expect(getLocationByIP()).rejects.toThrow("services.js (getLocationByIP): Param URL not found")
    })

});

describe("Get weather", () => {

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

    test("throw error if city param is not passed", async () => {
        await expect(getCurrentWeather()).rejects.toThrow("services.js (getCurrentWeather): Param query not found")
    })
});

describe("get forecast", () => {

    test("5 days by location", async () => {
        const { lon, lat } = await getLocationByIP(full_url_with_ip);
        const query = lat+","+lon;
        const response = await get5daysForecast(query);
        expect(response.forecast).toBeDefined();
        expect(response.location.country).toBe("Argentina");
    });

    test("5 days by city", async () => {
        const response = await get5daysForecast("Manchester");
        expect(response.forecast).toBeDefined();
        expect(response.location.country).toBe("United Kingdom");
    })

    test("throw error if city param is not passed", async () => {
        await expect(get5daysForecast()).rejects.toThrow("services.js (get5daysForecast): Param query not found")
    })
})