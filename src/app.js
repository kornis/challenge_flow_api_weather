import 'dotenv/config'
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import v1Routes from "./routes/v1.js";

// Middlewares

// Routes
app.use("/v1", v1Routes);

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));