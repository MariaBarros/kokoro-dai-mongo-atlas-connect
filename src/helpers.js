let fs = require('fs');

let helpers = {};

helpers.red = '\x1b[31m%s\x1b[0m';

helpers.green = '\x1b[32m%s\x1b[0m';

helpers.yellow = '\x1b[33m%s\x1b[0m';

helpers.cyan = '\x1b[36m%s\x1b[0m';

helpers.bgCyan = "\x1b[46m";


// Show a header for that is as wide as the screen
helpers.setHeader = function(title){

  console.log("\n");

  this.horizontalLine();

  this.centered(title);

  this.horizontalLine();

};

helpers.setFooter = function(){

  console.log("\n");

};

// Create a vertical space
helpers.verticalSpace = function(lines){

  lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;

  for (let i = 0; i < lines; i++) {

      console.log('');

  }

};


// Create a horizontal line across the screen
helpers.horizontalLine = function(){

  // Get the available screen size
  const width = process.stdout.columns || 100;  
  
  const line = helpers.completeLine(width + 1, '=');   

  console.log(line);

};

// Create centered text on the screen
helpers.centered = function(str){

  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

  // Get the available screen size
  const width = process.stdout.columns || 100;  

  // Calculate the left padding there should be
  const leftPadding = Math.floor((width - str.length - 1) / 2);

  // Put in left padded spaces before the string itself
  let line = helpers.completeLine(leftPadding);  

  line += ` ${str} ${line}`;

  console.log(helpers.cyan, line);

};

helpers.completeLine = function(width, char = ' '){  

  let line = '';

  for (i = 0; i < width; i++) {

    line += char;

  }

  return line;

}

helpers.getCommandOptions = function(args){

  const optArgs = (args) ? args.match(/(--\w+)\s*(\/?\w+\.?\/?)+/gm): null;  

  if(!optArgs){

    return null;

  }  

  let el = {};

  optArgs.map((arg) => {

      const comm = arg.replace("--", "").split(" ").filter((el) => {

        return el !== "" }
        
      );      

      el[comm[0]] = (comm[1]) ? comm[1] : true;      

  });

  return el;

};

helpers.printTable = (collection) =>{

  for(let key in collection){

    if(collection.hasOwnProperty(key)){          

      let line = `      \x1b[36m ${key}      \x1b[0m`;

      const padding = 60 - line.length;

      line += `${helpers.completeLine(padding)} ${collection[key]}\n`;

      console.log(line);      

    }

  }

  console.log("\n\n");

}

// Write data to a file
helpers.create = function(source, data){

  const outFile = fs.openSync(source, 'w');

  fs.writeSync(outFile, data, 0, data.length, null);

  console.log(helpers.yellow,`\n\t${source} has created succefully`);

  fs.closeSync(outFile);

};

// Read data from a file
helpers.readFile = (source) => {

  try{

    return fs.readFileSync(source, 'utf8');    

  }catch(e){

    return null;
  }
  
};

helpers.readDir = (path)=>{

  try{

    return fs.readdirSync(`${path}/`);

  }catch(e){

    return null;

  }

}

helpers.existsFile = (fileName) =>{

  return fs.existsSync(fileName);
  
}


// Export helpers
module.exports = helpers;