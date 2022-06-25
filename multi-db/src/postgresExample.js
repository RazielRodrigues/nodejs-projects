const Sequelize = require('sequelize');

const driver = new Sequelize(
    'herois',
    'admin',
    'admin',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
)

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'tb_herois',
        freezeTableNames: false,
        timeStamps: 0
    });

    await Herois.sync();
    await Herois.create({
        nome: 'Raziel',
        poder: 'Loco',
    });

    const result = await Herois.findAll(
        { raw: true , attributes: ['nome']}
    );
    
    console.log(result);

}

main();