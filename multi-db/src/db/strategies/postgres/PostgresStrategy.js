const IDb = require('../interfaces/interfaceDb');
const Sequelize = require('sequelize');

class PostgresStrategy extends IDb {

  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options
    )
    await model.sync();
    return model;
  }

  static async connect() {
    const connection = new Sequelize(
      'herois',
      'admin',
      'admin',
      {
          host: 'localhost',
          dialect: 'postgres',
          quoteIdentifiers: false,
          operatorAliases: false
      }
    );

    return connection;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error('fail!', error);
      return false;
    }
  }

  async create(item) {
    const {
      dataValues
    } = await this._schema.create(item, { raw: true });
    return dataValues;
  }

  async read(item = {}) {
    return this._schema.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return this._schema.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }

}

module.exports = PostgresStrategy;
