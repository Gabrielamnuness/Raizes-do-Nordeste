import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import rotas from "./routes/index.js";
import { swaggerDocument } from "./swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", rotas);

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log(`API rodando na porta ${porta}`);
  console.log(`Swagger disponível em http://localhost:${porta}/api-docs`);
});
