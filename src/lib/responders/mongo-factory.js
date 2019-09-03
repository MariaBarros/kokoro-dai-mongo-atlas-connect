const path = require('path');

const helpers = require('../helpers');

const schemas = require('./mongo-schemas');

let currentPath;

let tplDir;

let mongoFactory = {};

const setConn = (config, dev = true) =>{  

  const user = (dev === true ) ? config.users.dev : config.users.prod;
      
  const db = config.database;

  return `${config.server}${user.name}:${user.password}@${config.cluster}/${db}?retryWrites=true&w=majori`;  

};

const setPaths = () =>{

  currentPath = process.argv[1];

  tplDir = path.join(path.dirname(currentPath), 'lib', 'tpl');  

}

mongoFactory.setConfig = async (configOptions) => {  

  setPaths();  

  const connDev = setConn(configOptions);

  const connProd = setConn(configOptions, false);      

  const urlTpl = path.join(tplDir,'MongoConfig.tpl');

  const data = helpers.readFile(urlTpl)
            .replace("$stagingConn", connDev)
            .replace("$prodConn", connProd); 

  // Get data directory
  if(!helpers.readDir(configOptions.dest)){

    console.log(`Path ${configOptions.dest} not found.`);
              
  }else{

    const fileConfig = path.join(configOptions.dest,"MongoConfig.js");    

    helpers.create(fileConfig, data);

    await mongoFactory.create(configOptions.dest, "MongoConnectFactory")

    await mongoFactory.create(configOptions.dest, "MongoTransactionFactory");

  }

}

mongoFactory.create = async (dest, fileName) => {

  const urlTpl = path.join(tplDir,`${fileName}.tpl`);

  const data = helpers.readFile(urlTpl);

  if(!data){

    return;

  }

  // Get data directory  
  if(!helpers.readDir(dest)){

    console.log(`Path ${dest} not found.`);

    return;
              
  }

  const fileConfig = path.join(dest,`${fileName}.js`);    

  helpers.create(fileConfig, data);
 
}

mongoFactory.createModels = async (schemas, dest) => {

  setPaths();

  const urlTpl = path.join(tplDir,`MongoModelFactory.tpl`);

  const data = helpers.readFile(urlTpl);  

  if(!data){

    return;

  }  

  if(!helpers.readDir(dest)){

    console.log(`Path ${dest} not found`);

    return;
              
  }  
  
  schemas.forEach((schema) => {

    const collectionName = schema.replace(".json", "");

    const modelContent = data.replace(/\$modelName/g, collectionName);    

    const fileName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    const fileConfig = path.join(dest,`${fileName}Model.js`);

    if(!helpers.existsFile(fileConfig)){

      helpers.create(fileConfig, modelContent);

    }else{

      console.log(`${fileConfig} already exists`);
    }    

  });
  
}

module.exports = mongoFactory;