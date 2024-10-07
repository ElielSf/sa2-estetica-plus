import express from "express";
import cors from "cors";
import http from "http";

import { connection } from "./config/database.js";

import { PORT } from "./config/config.js";

console.time("tempo para subir o servidor");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/read", (req, res) => {
    res.status(200).send("Teste");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em localhost:${PORT}`);
    fazendoRequisicao();
});

console.timeEnd("tempo para subir o servidor");

const fazendoRequisicao = async () => {
    console.time("Tempo total de execução.");

    const requests = [];

    for (let i = 0; i < 100; i++) {
        const requestPromise = new Promise((resolve) => {
            http.get(`http://localhost:${PORT}/read`, (res) => {
                console.log(i, `Status Code: ${res.statusCode}`);
                resolve();
            });
        });
        requests.push(requestPromise);
    };

    await Promise.all(requests);
    console.timeEnd("Tempo total de execução.");
};