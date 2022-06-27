const assert = require('assert')
const api = require('./../api');

let app = {}

describe('Suite de testes API', function () {

    this.beforeAll(async () => {
        app = await api;
    });

    it("Listar /herois", async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const status = result.statusCode;
        
        assert.deepEqual(status, 200);
        assert.ok(Array.isArray(dados));

    });

    it("Listar /herois deve retornar apenas 3", async () => {
        const limit = 3; 
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit}`
        })

        const status = result.statusCode;
        assert.deepEqual(status, 200);

    });

    it("Listar /herois deve filtrar", async () => {
        const limit = 1000;
        const nome = 'Batman1656371872449';

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit}&nome=${nome}`
        })
        console.log(result);
        const dados = JSON.parse(result.payload)
        const status = result.statusCode;

        assert.deepEqual(status, 200);
        assert.ok(dados[0].nome === nome)
    });


});