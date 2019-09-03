const stats = require('./stats');

const help = require('./help');

const mongoConnect = require('./mongo-connect');

const mongoSchemas = require('./mongo-schemas');

const mongoFactory = require('./mongo-factory');

let responders = {

  stats: stats.respond,

  help: help.respond,

  connect: mongoConnect.connect,

  collections: mongoConnect.collections,

  schemas: mongoSchemas.getSchemas,

  models: mongoFactory.createModels,

  updateSchema: mongoSchemas.updateSchema,

  dbStats: mongoConnect.stats,

  factoryConfig: mongoFactory.setConfig

};

module.exports = responders;