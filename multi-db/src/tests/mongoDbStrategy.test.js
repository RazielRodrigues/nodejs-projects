const assert = require('assert');
const MongoStrategy = require('./../db/strategies/mongodb/MongoStrategy');
const Context = require('./../db/strategies/base/contextStrategy');
const heroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema.js');

const MOCK_HEROI = { nome: 'Gaviao', poder: 'Flecha' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman' + Date.now(), poder: 'Dinheiro' }

let MOCK_HEROI_ATUALIZAR_ID = '';
let context = {}

describe("Suite de testes Mongo Strategy", function () {

    this.beforeAll(async function () {
        const connection = MongoStrategy.connect();
        context = new Context(new MongoStrategy(connection, heroisSchema))

        await context.create(MOCK_HEROI_ATUALIZAR)
        const result = await context.create(MOCK_HEROI);
        MOCK_HEROI_ATUALIZAR_ID = result._id;

    })

    it("mongo connection", async function () {
        const result = await context.isConnected()
        const expected = 'conectado';

        assert.equal(result, expected);
    })

    it("cadastrar", async function () {
        const { nome, poder } = await context.create(MOCK_HEROI)
        assert.deepEqual({ nome, poder }, MOCK_HEROI);
    })

    it("listar", async function () {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI.nome })
        const result = {
            nome, poder
        }

        assert.deepEqual(result, MOCK_HEROI);
    })

    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
            poder: 'Laço'
        })
        assert.deepEqual(result.modifiedCount, 1)
    })

    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID)
        assert.deepEqual(result.deletedCount, 1)
    })

})
