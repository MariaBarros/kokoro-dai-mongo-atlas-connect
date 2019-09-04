let MongoClient = require('mongodb').MongoClient;

const path = require('path');

const helpers = require('../helpers');

const mongoConnect = require('./mongoConnect');

let mongoSchemas = {};

let schemasDir;

let optionConnection;

mongoSchemas.getSchemas = async (configOptions) => {  

  if(!configOptions.schemas){

    console.log("Schemas properties in the config file is required");

    return;

  }
    
  optionConnection = configOptions;

  const currentDir = path.dirname(process.argv[1]);

  // Get schemas directory
  schemasDir = configOptions.schemas;

  const schemas = helpers.readDir(schemasDir);  

  if(!schemas){

    console.log(`No schemas in ${schemasDir}. Check the route`);

  }

  return schemas;

}

mongoSchemas.collectionExist = (schema, docs) => {

  const existCollection = docs.filter((doc) => {

    return doc.name === schema.replace(".json", "");

  });

  return existCollection.length > 0;
}

mongoSchemas.updateSchema = async (schema, docs) => {  

  // Get schemas directory
  const urlFileSchema = path.join(schemasDir, schema);

  const content = JSON.parse(helpers.readFile(urlFileSchema));

  const collection = schema.replace(".json", "");  

  const client = await mongoConnect.connect(optionConnection);

  const db = client.db(client.s.options.dbName);   

  const optSchema = {

    collMod: collection, 

    validator: content.validator, 

    validationAction: content.validationAction || "error",

    validationLevel: content.validationLevel || "strict"

  };

  if(mongoSchemas.collectionExist(schema, docs) === false){

    delete optSchema.collMod;

    await db.createCollection(collection, optSchema);

    console.log('      \x1b[33m ' + collection + ' has been created      \x1b[0m');    

  }else{              

    await db.command(optSchema);

    console.log('      \x1b[33m ' + collection + ' has been updated      \x1b[0m');    
          
  }

}

mongoSchemas.getProperties = function(schema){   

  // Get schemas directory
  const urlFileSchema = path.join(schemasDir, schema);

  const content = JSON.parse(helpers.readFile(urlFileSchema));

  const jsonSchema = content.validator.$jsonSchema;

  return jsonSchema;

}

module.exports = mongoSchemas;