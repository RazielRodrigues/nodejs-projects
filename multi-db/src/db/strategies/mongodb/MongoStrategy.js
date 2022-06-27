const IDb = require('../interfaces/interfaceDb');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'disconectado',
  1: 'conectado',
  2: 'conectando',
  3: 'disconectando'
};

class MongoStrategy extends IDb {

  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }


  static connect() {
    Mongoose.connect(
      'mongodb://admin:admin@localhost:27017',
      { useNewUrlParser: true }, function (error) {
        if (!error) return;
        console.log('conexao monga!', error);
      });

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('database ok!'));
    return connection;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState]
    if (state === 'conectado') return state;
    if (state !== 'conectando') return state;

    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS[this._connection.readyState];
  }

  async create(item) {
    return await this._schema.create(item)
  }

  async read(item, skip = 0, limit = 10) {
    return await this._schema.find(item).skip(skip).limit(limit);
  }

  async update(id, item) {
    return this._schema.updateOne({_id: id}, { $set: item})
  }
  
  async delete(id) {
    return this._schema.deleteOne({ _id: id });
  }

}

module.exports = MongoStrategy;
