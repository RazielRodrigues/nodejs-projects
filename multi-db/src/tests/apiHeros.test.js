const assert = require('assert')
const api = require('./../api');

let app = {}

describe.only('Suite de testes API', function () {

    this.beforeAll(async () => {
        app = await api;
    });

    it("Listar /herois", async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const status = result.statusCode;
        
        assert.deepEqual(status, 200);
        assert.ok(Array.isArray(dados));

    });

});