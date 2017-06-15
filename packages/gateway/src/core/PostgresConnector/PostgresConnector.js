import knex from 'knex';
import Connector from 'core/Connector';

class PostgresConnector extends Connector {
  constructor(config) {
    super(config);
    this.db = knex(config);
  }

  findList(modelName) {
    return this.db.select().table(modelName);
  }

  findObject() {}

  createObject() {}

  deleteObject() {}

  updateObject() {}
}

export default PostgresConnector;
