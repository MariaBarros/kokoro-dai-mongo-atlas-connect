const path = require('path');

const fs = require('fs');

const commands = {

  'connect': 'Connect to a database provider and test the connection',

  'collections': {

    main: 'Get the collections list of a given database',

    commands: [
      {
        command: "--schemas", 

        description: "Update validations schemas remotely from schemas defined locally"

      }
    ]
  },

  'generate': {

    main: 'Generate main resources for making transactions with the database',

    commands: [
      {
        command: "--factory",

        description: "Generate connection and transactions resources"
      },
      {
        command: "--models",

        description: "Generate models based on the validations schemas defined"

      }
    ]
  },

  'g': 'Alias of "generate"',

  'stats' : {

    main: 'Get statistics on the underlying operating system and resource utilization',

    commands: [
      {
        command: "--db",

        description: 'Get statistics of a given database'
      }
    ]
  },

  'help' : "Show the cli's available commands",

  'exit' : 'Kill the CLI (and the rest of the application)'

};

// Export config
module.exports = {

  commands: commands,

  inputs: Object.keys(commands),

  interface: {

    input: process.stdin,

    output: process.stdout,

    prompt: 'CLI Interface. Type your command: '    
    
  }
  
};