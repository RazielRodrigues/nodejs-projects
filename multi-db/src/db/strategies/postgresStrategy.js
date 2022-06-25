const IDb = require('./base/interfaceDb');
const Sequelize = require('sequelize');
class PostgreSQLConnection {
  static connect() {}
}
class PostgreSQLStrategy extends IDb {

  constructor() {
    super();
    this._herois = null;
    this._sequelize = null;
  }

  async defineModel() {
    this._herois = this._sequelize.define(
      'herois',
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        //opcoes para base existente
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
      },
    );
  }

  async connect() {
    this._sequelize = new Sequelize(
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

    await this.defineModel();
  }

  async isConnected() {
    try {
      await this._sequelize.authenticate();
      return true;
    } catch (error) {
      console.error('fail!', error);
      return false;
    }
  }

  async create(item) {
    const {
      dataValues
    } = await this._herois.create(item, { raw: true });
    return dataValues;
  }

  async read(item = {}) {
    return this._herois.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return this._herois.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._herois.destroy({ where: query });
  }

}

module.exports = PostgreSQLStrategy;
