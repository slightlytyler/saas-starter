import knex from 'knex';
import Connector from 'core/Connector';

class PostgresConnector extends Connector {
  constructor(config) {
    super(config);
    this.store = knex(config);
  }

  findList(modelName) {
    return this.store.select().table(modelName);
  }

  // eslint-disable-next-line class-methods-use-this
  findObject() {}

  // eslint-disable-next-line class-methods-use-this
  createObject() {}

  // eslint-disable-next-line class-methods-use-this
  deleteObject() {}

  // eslint-disable-next-line class-methods-use-this
  updateObject() {}
}

export default PostgresConnector;
