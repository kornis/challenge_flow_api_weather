const base_url = process.env.BASE_URL || "/v1";
import { dynamicImport } from "../../utils/helpers.js";

// Importamos los controller de forma dinámica segun la base_url
const mainController = (await dynamicImport(`controllers${base_url}/mainController.js`)).default;


export default (app) => {
    app.use(base_url+"/location", async (req, res, next) => {
        if(req.method == "GET") {
            await mainController.getLocationByIp(req, res);
        } else {
            next();
        }
    });

    app.use(base_url+"/current/:city?", async (req, res, next) => {

        if(req.method == "GET"){
            await mainController.currentWeather(req, res);
        } else {
            next();
        }
    });

    app.use(base_url+"/forecast/:city?", async (req, res) => {

        if(req.method == "GET") {
            await mainController.getForecast(req, res);
        } else {
            next()
        }
    })
}