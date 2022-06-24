const service = require('../service/service')

async function main() {
    try {
        const result = await service.obterPessoas('a');
        const names = [];

        console.time('for');
        for(let i=0; i <= result.results.lenght - 1; i++){
            let pessoa = result.result[i];
            names.push(pessoa.name)
        }
        console.timeEnd('for');

        console.time('for in');
        for (let i in result.results){
            let pessoa = result.results[i]
            names.push(pessoa.name);
        }
        console.timeEnd('for in');

        console.time('for of');
        for(pessoa of result.results){
            names.push(pessoa.name);
        }
        console.timeEnd('for of');

        console.log(names);

    } catch (error) {
        console.error('erroe interno', error);
    }
}

main();