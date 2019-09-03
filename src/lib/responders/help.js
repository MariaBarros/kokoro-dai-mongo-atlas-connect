const helpers = require('../helpers');

let help = {};

help.respond = function(commands){	
  
  helpers.setHeader('CLI HELP');

  helpers.verticalSpace(2);

  // Show each command, followed by its explanation, in white and yellow respectively
  for(let key in commands){

    if(commands.hasOwnProperty(key)){          

      let line = '      \x1b[33m ' + key + '      \x1b[0m';

      const padding = 60 - line.length;      

      line += helpers.completeLine(padding) + ' ' + (commands[key].main || commands[key]) + "\n";

      console.log(line);

      if(commands[key].main){        

      	const details = commands[key].commands;

      	details.map((el) => {

      		const subCommand = '\t\t' + el.command + helpers.completeLine( 15 - el.command.length) + el.description + "\n";			

      		console.log(subCommand);

      	});

      	console.log("\n\n");

      }

    }

  }

  console.log("\n\n");

}

module.exports = help;