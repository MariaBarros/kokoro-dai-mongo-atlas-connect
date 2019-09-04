const stats = require('./stats');

const help = require('./help');

const mongoConnect = require('./mongoConnect');

const mongoSchemas = require('./mongoSchemas');

const mongoFactory = require('./mongoFactory');

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