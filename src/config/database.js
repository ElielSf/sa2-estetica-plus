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
    const [rows] = await connection.query("SELECT * FROM agenda WHERE nome_pessoa = ?;", [name]);
    return rows[0];
}

export async function getAgendaByNamePart(name) {
    const [rows] = await connection.query("SELECT * FROM agenda WHERE nome_pessoa LIKE ?;", [`%${name}%`]);
    return rows[0];
}

export async function getAgendaBetweenData() {
    const [rows] = await connection.query("SELECT * FROM agenda WHERE data_agendamento BETWEEN '2024-10-02' AND '2024-10-10';");
    return rows[0];
}

export async function updateAgendaById(id, new_date) {
    await connection.query("UPDATE agenda SET data_agendamento = ? WHERE id_agenda = ?;", [new_date, id]);
    const [rows] = await connection.query("SELECT * FROM agenda WHERE id_agenda = ?;", [id]);
    return rows[0];
};

export async function deleteAgendaById(id) {
    const [rows] = await connection.query("DELETE FROM agenda WHERE id_agenda = 1;", [id]);
    return rows[0];
}