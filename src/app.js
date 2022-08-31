import 'dotenv/config'
import express from "express";
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import path from "path";
const app = express();
const PORT = process.env.PORT || 3000;

import v1Routes from "./routes/v1.js";

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve("src","OpenApi","openapi.json")));
// Middlewares

// Routes

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1", v1Routes);

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));