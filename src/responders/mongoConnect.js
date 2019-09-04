let MongoClient = require('mongodb').MongoClient;

const helpers = require('../helpers');

let mongoConnect = {};

let client = null;

const getConn = (config) => {

  const user = config.users.admin;

  const cluster = config.cluster;

  const db = config.database;    

  return `${config.server}${user.name}:${user.password}@${cluster}/${db}?retryWrites=true&w=majori`;      

}

mongoConnect.connect = async (configOptions) => {

  if(client){  

    return client;

  }

  const optionConn = { useNewUrlParser: true, useUnifiedTopology: true };      

  client = await MongoClient.connect(getConn(configOptions), optionConn).catch((err) =>{

    console.log(helpers.red, `Imposible to connect to ${conn}. Verify the string connection.`);          

  });

  return client; 

}

mongoConnect.collections = async (configOptions, show = false) => {  

  const client = await mongoConnect.connect(configOptions);

  const db = client.db(client.s.options.dbName);  

  const list = await db.listCollections().toArray();

  if(list && list.length === 0){

    console.log(helpers.yellow, '\tEmpty DB');

  }else{

    if(show === true){

      console.log(helpers.cyan,'\n-Available collections:');

      list.forEach((doc, idx, array) => {
        
        console.log(`      \x1b[33m ${doc.name}      \x1b[0m`);

      });

      console.log(helpers.cyan, '\nEnd of collections list. \n');

    }      

  }

  return list;

}

mongoConnect.stats = async (configOptions) => {

  helpers.setHeader('MONGODB STATISTICS');

  console.log(helpers.cyan, `\nGetting database data... wait\n`);

  const client = await mongoConnect.connect(configOptions);

  const db = client.db(client.s.options.dbName);
    
  const stats = await db.stats();  

  client.close();

  return stats;

}

module.exports = mongoConnect;