const { Command } = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    const program = new Command();

    program
        .version('v1')

        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p, --poder [value]', "Poder do heroi")
        .option('-i, --id [value]', "ID do heroi")

        // CRUD
        .option('-c, --cadastrar', "Cadastrar heroi")
        .option('-r, --listar', "Listar herois")
        .option('-u, --atualizar [value]', "Atualizar heroi pelo id")
        .option('-d, --remover', "Remover heroi pelo id")

    program.parse(program.argv);

    const options = program.opts();
    const heroi = new Heroi(options);

    try {

        if (options.cadastrar) {
            delete heroi.id;

            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error('Heroi nao cadastrado');
                return;
            }

            console.log("Heroi cadastrado!");
            return;
        }

        if (options.listar) {
            const resultado = await Database.listar();
            console.table(resultado);
            return;
        }

        if (options.remover) {
            
            const resultado = await Database.remover(heroi.id);
            if (!resultado) {
                console.error('Não foi possivel remover o heroi!');
                return;
            }

            console.log("Heroi removido com sucesso!");
            return;
        }

        if (options.atualizar) {


            delete heroi.id;
            
            const idParaATualizar = parseInt(options.atualizar);
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await Database.atualizar(idParaATualizar, heroiAtualizar);

            if (!resultado) {
                console.error('Não foi possivel atualizar!');
                return;
            }

            console.log('Atualizado com sucesso!');
            return;
        }

    } catch (error) {
        console.error('DEU RUIM', error);
    }

}

main();