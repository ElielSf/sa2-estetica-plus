import { connection, getAgendaBetweenData, getAgendaById, getAgendaByName, getAgendaByNamePart, updateAgendaById, deleteAgendaById } from "../config/database.js";

describe("getAgendaById", () => {

    beforeAll(async () => {
        await connection.query("CREATE TABLE IF NOT EXISTS agenda (`id_agenda` INT(11) AUTO_INCREMENT NOT NULL,`nome_pessoa` VARCHAR(255) NOT NULL,`contato_telefonico` VARCHAR(13) NOT NULL,`email` VARCHAR(255) NOT NULL,`data_agendamento` VARCHAR(13) NOT NULL,PRIMARY KEY (`id_agenda`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)");
        await connection.query("INSERT INTO agenda (`nome_pessoa`, `contato_telefonico`, `email`, `data_agendamento`) VALUES ('Eliel Souza', '75933008953', 'eliel@gmail.com', '03/10/2024');");
    });

    afterAll(async () => {
        await connection.query("TRUNCATE TABLE agenda;");
    });

    test("1 - Verificar se retorna o usuário correto", async () => {
        const agenda = await getAgendaById(1);

        expect(agenda).toHaveProperty("id_agenda", 1);
        expect(agenda).toHaveProperty("nome_pessoa", "Eliel Souza");
        expect(agenda).toHaveProperty("contato_telefonico", "75933008953");
    });
});

describe("Leitura", () => {
    beforeAll(async () => {
        await connection.query("CREATE TABLE IF NOT EXISTS agenda (`id_agenda` INT(11) AUTO_INCREMENT NOT NULL,`nome_pessoa` VARCHAR(255) NOT NULL,`contato_telefonico` VARCHAR(13) NOT NULL,`email` VARCHAR(255) NOT NULL,`data_agendamento` VARCHAR(13) NOT NULL,PRIMARY KEY (`id_agenda`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)");
        await connection.query("INSERT INTO agenda (`nome_pessoa`, `contato_telefonico`, `email`, `data_agendamento`) VALUES ('Eliel', '75933008953', 'eliel2@gmail.com', '2024-10-03');");
        await connection.query("INSERT INTO agenda (`nome_pessoa`, `contato_telefonico`, `email`, `data_agendamento`) VALUES ('Eliel2', '75933008953', 'eliel3@gmail.com', '2024-10-07');");
    });

    afterAll(async () => {
        await connection.query("TRUNCATE TABLE agenda;");
    });

    test("1 - Verificar se retorna o usuário por um nome específico", async () => {
        const agendas = await getAgendaByName("Eliel");

        expect(agendas.nome_pessoa).toMatch("Eliel");
    });

    test("2 - Verificar se retorna o usuário por parte do nome", async () => {
        const agendas = await getAgendaByNamePart("Eli");

        expect(agendas.nome_pessoa).toMatch(/Eli/);
    });

    test("3 - Verificar se o tempo de resposta é menor que 100ms", async () => {
        const inicio = performance.now();
        await getAgendaById(1);
        const fim = performance.now();

        const duracao = fim - inicio;
        
        expect(duracao).toBeLessThanOrEqual(100);
    });

    test("4 - Obter os agendamentos entre 02/10/2024 e 10/10/2024", async () => {
        const agendas = await getAgendaBetweenData();

        expect(agendas).not.toBeUndefined();
    });
});

describe("Atualizar", () => {
    beforeAll(async () => {
        await connection.query("CREATE TABLE IF NOT EXISTS agenda (`id_agenda` INT(11) AUTO_INCREMENT NOT NULL,`nome_pessoa` VARCHAR(255) NOT NULL,`contato_telefonico` VARCHAR(13) NOT NULL,`email` VARCHAR(255) NOT NULL,`data_agendamento` VARCHAR(13) NOT NULL,PRIMARY KEY (`id_agenda`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)");
        await connection.query("INSERT INTO agenda (`nome_pessoa`, `contato_telefonico`, `email`, `data_agendamento`) VALUES ('Eliel', '75933008953', 'eliel2@gmail.com', '2024-10-03');");
    });

    afterAll(async () => {
        await connection.query("TRUNCATE TABLE agenda;");
    });

    test("1 - Atualiza a data da agenda de um id específico", async () => {
        const agenda_atualizada = await updateAgendaById(1, '2024-10-04');

        expect(agenda_atualizada).toHaveProperty("data_agendamento", "2024-10-04");
    });
});

describe("Deletar", () => {
    beforeAll(async () => {
        await connection.query("CREATE TABLE IF NOT EXISTS agenda (`id_agenda` INT(11) AUTO_INCREMENT NOT NULL,`nome_pessoa` VARCHAR(255) NOT NULL,`contato_telefonico` VARCHAR(13) NOT NULL,`email` VARCHAR(255) NOT NULL,`data_agendamento` VARCHAR(13) NOT NULL,PRIMARY KEY (`id_agenda`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)");
        await connection.query("INSERT INTO agenda (`nome_pessoa`, `contato_telefonico`, `email`, `data_agendamento`) VALUES ('Eliel', '75933008953', 'eliel2@gmail.com', '2024-10-03');");
    });

    afterAll(async () => {
    await connection.query("TRUNCATE TABLE agenda;");
        await connection.end();
    });

    test("1 - Verificar se a agenda deletada pelo id é undefined", async () => {
        const agenda_deletada = await deleteAgendaById(1);

        expect(agenda_deletada).toBeUndefined();
    });
});
