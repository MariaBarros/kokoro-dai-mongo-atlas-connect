 // Node Dependencies
const events = require('events');

// Lib Dependencies
const responders = require('./responders/index');

// Locals
const config = require('./config');

const helpers = require('./helpers');

class _events extends events{};

const e = new _events();

// Test the MongoDB connection
e.on('connect', async (options, args, callback) => {

  helpers.setHeader('CONNECT TO MONGODB');

  console.log(helpers.cyan, `\nConnecting to database... wait`);   

  const client = await responders.connect(options);

  if(client){

    client.close();

    console.log(helpers.green, `\n\tSuccessful connection\n`);

  }  

  console.log(helpers.cyan, `Finish\n`);

  callback();

});

// Show the database collections or update schemas
e.on('collections', async (options, args, callback) => {  

  const comms = helpers.getCommandOptions(args);

  helpers.setHeader('MONGODB COLLECTIONS');  

  if(!comms || !comms.schemas){

    console.log(helpers.cyan, `\nGetting collections... wait`);

    await responders.collections(options, true);    

    callback();

  }else{

    e.emit('schemasUpdate', options, args, callback);   

  }

});

// Update schemas
e.on('schemasUpdate', async (options, args, callback) => {  

  const schemas = await responders.schemas(options);  

  console.log(helpers.cyan, `\nUpdating schemas... wait`);   

  const docs = await responders.collections(options);  

  let tran = 0;

  if(!schemas){

    callback();

    return;

  }

  schemas.forEach(async (schema) => {

    await responders.updateSchema(schema, docs);

    tran += 1;    

    if(tran === schemas.length){

      console.log(helpers.cyan, `\nFinish\n`);

      callback();
            
    }

  });  

});

// Update models
e.on('modelsUpdate', async (options, args, callback) => {  

  console.log(helpers.cyan, `\nUpdating models... wait`);

  const schemas = await responders.schemas(options);  

  const models = await responders.models(schemas, options.dest);

  callback();    

});

// Show available cli's commands
e.on('help', (options, args, callback) => {

  responders.help(config.commands);

  callback();

});

e.on('g', (options, args, callback) => {

  e.emit('generate', options, args, callback);

});

// Generate
e.on('generate', async (options, args, callback) =>{

  const comms = helpers.getCommandOptions(args);  

  if(comms && comms.factory){

    console.log(helpers.cyan, `\nCreating resources... wait..\n`); 

    await responders.factoryConfig(options);

    callback();

  }else{

    if(comms && comms.models){

      e.emit('modelsUpdate', options, args, callback);

    }else{

      callback();

    }

  }

});

// Show the stats
e.on('stats',async (options, args, callback) =>{      

  const comms = helpers.getCommandOptions(args);

  if(!comms || !comms.db){
    // Show the cli stats
    responders.stats();    

  }else{
    // Show the database stats
    const stats = await responders.dbStats(options);

    helpers.printTable(stats);    

  }

  callback();

});

 // Export the module
 module.exports = {

   emit: async function(command, options, callback){

    if(command.event === 'exit'){

       //Kill the cli
        process.exit(0);       

    }else{       
        
      try{

        const args = command.args.trim();

        await e.emit(command.event, options, args, callback);        

      }catch(err){
         
        console.log(err + "\n\n");

      }     

    }     

  }

};