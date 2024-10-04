import { connection, getAgendaById, getAgendaByName } from "../config/database";

describe("getAgendaById", () => {

    beforeAll(async () => {
        await connection.query("CREATE TABLE IF NOT EXISTS agenda (`id_agenda` INT(11) NOT NULL,`nome_pessoa` VARCHAR(255) NOT NULL,`contato_telefonico` VARCHAR(13) NOT NULL,`email` VARCHAR(255) NOT NULL,`data_agendamento` VARCHAR(13) NOT NULL,PRIMARY KEY (`id_agenda`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)");
        await connection.query("INSERT INTO agenda (`nome_pessoa`, `contato_telefonico`, `email`, `data_agendamento`) VALUES ('Eliel Souza', '75933008953', 'eliel@gmail.com', '03/10/2024');");
    });

    afterAll(async () => {
        await connection.query("TRUNCATE TABLE agenda;");
        await connection.end();
    });

    test("1 - Verificar se retorna o usuário correto", async () => {
        const agenda = await getAgendaById(1);

        expect(agenda).toHaveProperty("id_agenda", 1);
        expect(agenda).toHaveProperty("nome_pessoa", "Eliel Souza");
        expect(agenda).toHaveProperty("contato_telefonico", "75933008953");
    });

    test("2 - Verificar se retorna o usuário por parte do nome", async () => {
        const agendas = await getAgendaByName("Elie");

        expect(agendas.nome_pessoa).toMatch(/Elie/);
    });

    test("3 - Verificar se o tempo de resposta é menor que 100ms", async () => {
        const inicio = performance.now();
        await getAgendaById(1);
        const fim = performance.now();

        const duracao = fim - inicio;
        
        expect(duracao).toBeLessThanOrEqual(100);
    });

});