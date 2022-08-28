import express from "express";
import v1_controller from "../controllers/v1_controller.js";
const router = express.Router();

router.get("/location", v1_controller.getLocationByIp);
router.get("/current/:city?", v1_controller.currentWeather);
router.get("/forecast/:city?", v1_controller.getForecast);

export default router;