const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p, --poder [value]', "Poder do heroi")
        .option('-i, --id [value]', "id do heroi")

        .option('-c, --cadastrar [value]', "Cadastrar do heroi")
        .option('-l, --listar [value]', "Listar herois")
        .option('-r, --remover', "Remove heroi pelo id")
        .option('-a, --atualizar [value]', "Atualizar heroi pelo id")
        .parse(process.argv);
    
    const heroi = new Heroi(Commander);


    try {

        if (Commander.cadastrar) {
            delete heroi.id;
            
            const resultado = await Database.cadastrar(heroi);
            if(!resultado) {
                console.error('Heroi nao cadastrado');
                return;
            }

            console.log("Heroi cadastrado!");
            return;
        }

        if (Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id);
            if(!resultado) {
                console.error('Não foi possivel remover o heroi!');
                return;
            }

            console.log("Heroi removido com sucesso!");
            return;
        }

        if (Commander.atualizar) {
            const idParaATualizar = partseInt(Commander.atualizar);
            delete heroi.id;

            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await DAtabase.atualizar(idParaATualizar, heroiAtualizar);
            if(!resultado) {
                console.error('Não foi possivel atualizar!');
                return;
            }
            console.log('Atualizado com sucesso!');
        }

    } catch (error) {
        console.error('DEU RUIM', error);
    }
}

main();