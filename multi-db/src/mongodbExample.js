const Mongoose = require('mongoose');
Mongoose.connect(
    'mongodb://admin:admin@localhost:27017',
    { useNewUrlParser: true }, function (error){
        if(!error) return;
        console.log('conexao monga!', error);
});

const connection = Mongoose.connection;

connection.once('open', () => console.log('database ok!'));

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder:{
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const create = await model.create({
        nome: 'Super homem',
        poder: 'Kryptoniano'
    })
    console.log('create: ', create);

    const read = await model.find();
    console.log('read: ', read);

}

main();