const service = require('../service/service.js');

// É USADO QUANDO VOCE QUER TRATAR UM ARRAY
// EX: ME MOSTRE APENAS O NOME E O ENDEREÇO DA LISTA DE CLIENTES
// QUE VENHO DO BANCO DE DADOS

Array.prototype.meuMap = function (callback) {
    const novoArray = [];
    for (let indice = 0; indice < this.length -1; indice++) {
        const resultado = callback(this[indice], indice);
        novoArray.push(resultado);
    }

    return novoArray;
}

const main = async () => {
    try {
        const response = await service.obterPessoas('a');
        
        //const names = [];
        // response.results.forEach(function (item) {
        //     names.push(item.name);
        // });
        // const names = response.results.map(function (pessoa) {
        //     return pessoa.name
        // })
        // const names = response.results.map((pessoa) => pessoa.name)
        
        const names = response.results.meuMap(function (pessoa, indice) {
            return `[${indice}] ${pessoa.name}`;
        })

        
        console.log('names', names);
    } catch (error) {
        console.error('error', error);
    }
}

main();