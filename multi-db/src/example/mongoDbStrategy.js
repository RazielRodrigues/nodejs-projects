const IDb = require('./base/interfaceDb');
class Mongo extends IDb {
  constructor() {
    super();
  }
  create(item) {
    return 'Mongo';
  }
}

module.exports = Mongo;
