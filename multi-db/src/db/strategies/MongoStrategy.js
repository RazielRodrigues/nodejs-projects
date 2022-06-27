const IDb = require('./interfaces/interfaceDb');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'disconectado',
  1: 'conectado',
  2: 'conectando',
  3: 'disconectando'
};

class MongoStrategy extends IDb {

  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  async defineModel() {

    const heroisSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    });

    this._herois = Mongoose.model('herois', heroisSchema);
  }

  async connect() {
    Mongoose.connect(
      'mongodb://admin:admin@localhost:27017',
      { useNewUrlParser: true }, function (error) {
        if (!error) return;
        console.log('conexao monga!', error);
      });
    const connection = Mongoose.connection;
    this._driver = connection;
    connection.once('open', () => console.log('database ok!'));
    this.defineModel();
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState]
    if (state === 'conectado') return state;
    if (state !== 'conectando') return state;

    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS[this._driver.readyState];
  }

  async create(item) {
    return await this._herois.create(item)
  }

  async read(item, skip = 0, limit = 10) {
    return await this._herois.find(item).skip(skip).limit(limit);
  }

  // async update(id, item) {
  //   return this._herois.update(item, { where: { id } });
  // }

  async delete(id) {
    return this._herois.deleteOne({ _id: id });
  }

}

module.exports = MongoStrategy;
