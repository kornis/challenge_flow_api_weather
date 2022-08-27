import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares

// Routes

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));