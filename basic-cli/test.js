const { deepEqual } = require('assert');
const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'flash',
    poder: 'speed',
    id: 1
}

describe('Suite de manipulacao de herois', () => {

    it("deve listar herois", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [ resultado ] = await database.listar(expected.id);
        deepEqual(resultado, expected);
    });

    it("deve cadastrar herois", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;

        

        deepEqual(null, expected);
    });

});