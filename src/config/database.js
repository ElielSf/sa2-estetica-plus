import { createPool  } from "mysql2/promise";
import { HOST, USER, PASSWORD, DATABASE } from "./config.js";

export const connection = createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

export async function getAgendaById(id) {
    const [rows] = await connection.query("SELECT * FROM agenda WHERE id_agenda = ?;", [id]);
    return rows[0];
};

export async function getAgendaByName(name) {
    const [rows] = await connection.query("SELECT * FROM agenda WHERE nome_pessoa LIKE '%?%';", [name]);
    return rows[0];
}