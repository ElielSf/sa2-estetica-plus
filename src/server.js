import express from "express";
import cors from "cors";

import { connection } from "./config/database.js";

import { PORT } from "./config/config.js"

console.time("tempo para subir o servidor");
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor rodando em localhost:${PORT}`);
});

console.timeEnd("tempo para subir o servidor");