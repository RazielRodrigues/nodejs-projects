const assert = require('assert');
const MongoStrategy = require('./../db/strategies/mongodb/MongoStrategy');
const Context = require('./../db/strategies/base/contextStrategy');
const heroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema.js');

const MOCK_HEROI = { nome: 'Gaviao', poder: 'Flecha' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' }

let MOCK_HEROI_ID = '';
let context = {}

describe("Suite de testes Mongo Strategy", function () {

    this.beforeAll(async function () {
        const connection = MongoStrategy.connect();
        context = new Context(new MongoStrategy(connection, heroisSchema))

        await context.create(MOCK_HEROI_ATUALIZAR)
        const result = await context.create(MOCK_HEROI);
        MOCK_HEROI_ID = result._id;

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
        const [ {nome, poder} ] = await context.read({nome: MOCK_HEROI.nome})
        const result = {
            nome, poder
        }

        assert.deepEqual(result, MOCK_HEROI);
    })

    it.only("atualizar", async function() {
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})

        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})
        assert.deepEqual(result, 1);
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);

    })

    // it("deletar", async function() {
        // const result = await context.delete('62b917c908d06e0eb31845de')
        // assert.deepEqual(undefined, 1);
    // })

})
