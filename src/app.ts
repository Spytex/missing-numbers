import express from "express";
import apiRouter from "./routes/api";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api", apiRouter);

// Swagger documentation available at: /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
