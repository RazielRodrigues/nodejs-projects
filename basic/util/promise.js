function obterSeguradora() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // return reject(new Error('Não encontrado'));

            return resolve({
                id: 1,
                nome: 'Seguradora XYZ',
                dataContrato: new Date()
            })
        }, 1000);

    });
}

function obterTelefone(id){
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                numero: '1234-5678',
                ddd: 11
            })
        }, 1000);
    });
}

function obterEndereco(id){
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                logradouro: 'Rua ABC',
                numero: '123',
                bairro: 'Bairro ABC',
                cidade: 'Cidade ABC',
                estado: 'SP'
            })
        }, 2000);
    });
}

async function main(){
    try {
        console.time('medida-promise');

        const seguradora = await obterSeguradora();
        const resultado = await Promise.all([
            obterTelefone(seguradora.id),
            obterEndereco(seguradora.id)
        ]);

        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log(`
            Nome: ${seguradora.nome}
            Telefone: (${telefone.ddd}) ${telefone.numero}
            Endereço: ${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}
        `);

        console.timeEnd('medida-promise');
    } catch (error) {
        console.error(error);
    }
}

main();