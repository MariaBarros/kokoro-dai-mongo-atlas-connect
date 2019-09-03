#!/usr/bin/env node

// Node Dependencies
const readline = require('readline');

// Lib Dependencies
const eventManager = require('./lib/eventManager');

const config = require('./config');

const helpers = require('./lib/helpers');

// Interface input processor
const processInput = (str) =>{

  // Only process the input if the user actually wrote something, otherwise ignore it
  str = typeof(str) === 'string' && str.trim().length > 0 ? str.trim() : false;

  if(!str){   

    return false;    

  }

  // Go through the possible inputs, emit event when a match is found
  const actions = config.inputs.filter((input) => {
    
    return str.toLowerCase().indexOf(input) > -1;

  });

  const singleCommand = str.split(' ')[0];

  if(actions.length === 0 || singleCommand !== actions[0]){

    const msg = (actions.length === 0) ?
      `Sorry, then command "${str}" doesn´t exist. Type "help" for watching the available commands`:
      `Sorry, then command "${str}" doesn´t exist. Did you mean ${actions[0]}`;

    console.log(msg);    

    return false;

  }

  return {event: actions[0], args: str.replace(actions[0], '')};  
  
};

// Declare the cli
let cli = {};

// Init script
cli.init = (configOptions) =>{

  // Send to console
  console.log('\x1b[101m%s\x1b[0m','The CLI is running');

  config.options = configOptions;

  // Start the interface and show prompt
  _interface = readline.createInterface(config.interface);

  _interface.prompt();

  // Handle each line of input separately and send to the input processor
  _interface.on('line', (str) => {    
          
    const command = processInput(str);

    if(!command){

      _interface.prompt();

    }else{

      // Emit event matching the unique input, and include the full string given      
      eventManager.emit(command, config.options, () => _interface.prompt());

    }

  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', () =>  process.exit(0) );

};

// Init function
cli.run = function(){  	

  	// Process args  	
    const [, currentPath, ...args] = process.argv;    

    const argsCli = helpers.getCommandOptions(args.join(' '));

  	// Get the config file
  	if (!argsCli.config) {  		

  		console.log('Provide a config json file for use the CLI');

  		return;

  	}
  	  	
    const urlFile = argsCli.config;

  	// Check if the config file exists
  	if(!helpers.existsFile(urlFile)){

  		console.log(`The config file ${urlFile} doesn't exist`);

  		return;		

  	}

    const content = helpers.readFile(urlFile);  	

  	cli.init(JSON.parse(content));  			

};

// Self executing
cli.run();

// Export the app
module.exports = cli;