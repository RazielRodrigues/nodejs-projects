const { deepEqual } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    "id": 1,
    "nome": "Flash",
    "poder": "speed"
}

const DEFAULT_ITEM_ATUALIZAR = {
    "id": 2,
    "nome": "Lanterna verde",
    "poder": "energia do anel"
}

describe('Suite de manipulacao de herois', () => {

    before( async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    })

    it("deve listar herois", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id);
        deepEqual(resultado, expected);
    });

    it("deve cadastrar herois", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(resultado.id)
        deepEqual(actual, expected);
    });

    it("deve remover heroi por id", async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected);
    });

    it("deve atualizar heroi por id", async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            id: 2,
            nome: 'Batman',
            poder: 'Dinheiro'
        };

        const novoDado = {
            id: 2,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(resultado, expected);
    });

});