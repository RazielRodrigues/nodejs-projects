/*
traz tudo 
const service = require('.service');

const item = {
    nome: 'Raziel'
    idade: 12
}

detructing de objeto ele pega
pega o valor do objeto que tem a mesma chave 

const {nome, idade} = item
console.log(nome, idade)

*/

// traz somente uma função especifica
const { obterPessoas } = require('../service/service');

Array.prototype.meuFilter = function (callback) {
    const lista = [];
    for( index in this){
        const item = this[index]
        const result = callback(item, index, this);
        if(!result) continue;
        lista.push(item);
    }
    return lista;
}

const main = async () => {
    try {
        const { results } = await obterPessoas('a');

        // functiona como um select dentro do array
        // const familiaLars = results.filter( (item) => {
        //     const result = item.name.toLowerCase().indexOf('lars') !== -1;
        //     return result;
        // });

        const familiaLars = results.meuFilter( (item, index, lista ) => {
            console.log(`index: ${index}`, lista.length);
            return item.name.toLowerCase().indexOf('lars') !== -1
        });

        const names = familiaLars.map((pessoa) => pessoa.name);
        console.log(names);

    } catch (error) {
        console.error('error', error);
    }
}

main();