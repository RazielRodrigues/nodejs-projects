const assert = require('assert');
const PostgresStrategy = require('./../db/strategies/postgres/PostgresStrategy');
const HeroisSchema = require('./../db/strategies/postgres/schema/heroisSchema');
const Context = require('./../db/strategies/base/contextStrategy');

const MOCK_HEROI = { nome: 'Gaviao', poder: 'Flecha' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' }

let context = {}

describe("Suite de testes PostgresStrategy Strategy", function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        const connection = await PostgresStrategy.connect();
        const model = await PostgresStrategy.defineModel(connection, HeroisSchema)
        context = new Context(new PostgresStrategy(connection, model));

        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it("postgres connection", async function () {
        const result = await context.isConnected()
        assert.equal(result, true);
    })

    it("cadastrar", async function () {
        const result = await context.create(MOCK_HEROI)
        delete result.id

        assert.deepEqual(result, MOCK_HEROI);
    })

    it("listar", async function () {
        const [result] = await context.read({ nome: MOCK_HEROI.nome })
        delete result.id

        assert.deepEqual(result, MOCK_HEROI);
    })

    it("atualizar", async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })

        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        assert.deepEqual(result, 1);
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);

    })

    it("deletar", async function () {

        const [item] = await context.read({});
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1);

    })

})
