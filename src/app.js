import 'dotenv/config'
import express from "express";
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import path from "path";
const app = express();
import { dynamicImport } from "./utils/helpers.js";
const PORT = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || "/v1";
const mainRoutes = await dynamicImport(`routes${base_url}/mainRouter.js`);

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve("src","OpenApi","openapi.json")));
// Middlewares

// Routes

app.use(base_url+'/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Rutas dinámicas segun el base_url
mainRoutes.default(app)

app.use( (req, res) => res.status(404).json({code: 404, error: req.protocol + "://" + req.get("host") + req.url + " - NOT FOUND"}))

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));