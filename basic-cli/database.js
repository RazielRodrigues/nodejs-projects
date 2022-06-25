const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

//outra forma de objeter dados json
//const dadosJson = require('./herois.json');

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo();
        const id = heroi.id <= 2 ? heroi.id : Date.now();

        // concatenação de objetos
        const heroiComId = {
            id,
            ...heroi
        };

        const dadosFinal = [
            ...dados,
            heroiComId
        ];

        return await this.escreverArquivo(dadosFinal);
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo();
        return dados.filter(item => (id ? (item.id === id) : true));
    }

    async remover(id) {
        if (!id) return await this.escreverArquivo();

        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));

        if (!indice === -1) {
            throw new Error('Usuario nao existe');
        }

        dados.splice(indice, 1);

        return await this.escreverArquivo(dados);
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));

        if (!indice === -1) throw new Error('Heroi nao existe');

        const atual = dados[indice];
        const objetosAtualizar = {
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1);

        return await this.escreverArquivo([
            ...dados,
            objetosAtualizar
        ]);

    }

}

module.exports = new Database();