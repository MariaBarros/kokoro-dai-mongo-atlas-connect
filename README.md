# Mongo Atlas Connect
This is a Node Command Line Interface to manage collections created in Mongo Atlas.

## Requirements and Dependencies
1. NodeJS version 10.9.0 or later.
2. Mongodb npm package.
3. Your Mongo Atlas account.

## Main features
Mongo Atlas Connect is a CLI developed in Node that can do the following tasks for you:
1. Check a Mongo database connection.
2. Create and update custom validation schemas remotely.
3. Generate the models for each schema you define.
4. View current statistics of your Mongo database.
5. Facilitate the tests of CRUD functionalities.

## Getting Started

### Install MongoDB dependency in your project:
If you want to install this dependency locally, run `npm install mongodb`, otherwise run `npm install -g mongodb`.

### Get the MongoDB string connection from Mongo Atlas
I you have not an account in Mongo Atlas, follow [these steps](https://docs.atlas.mongodb.com/getting-started/) for creating one.

Once you have a Mongo Atlas account, [enter to your panel](https://cloud.mongodb.com/user#/atlas/login) and:
- Go to the **Clusters** section.
- Click on the **Connect** button. 
- Select the Connection Method "Connect your Application".
- Choose Node.js as Driver and select your version. 
- Finally, copy your connection string.

The connection string should look like this:

`mongodb+srv://<username>:<password>@cluster0-417hl.mongodb.net/test?retryWrites=true&w=majority`

### Create your configuration file
This CLI needs a config file that defines:

- The **server** and **cluster** you have to connect (``server`` and ``cluster`` properties in the file). For the above string connection, the ``server`` would be: `mongodb+srv://` and the ``cluster would be``: `cluster0-417hl.mongodb.net`.
- The authorized **users** to operate your database. One of these users has to have administrator permissions because of the CLI updates collections schemas remotely. You can get this information from the Database Access section in your Mongo Atlas panel.
- Your **database** name (``database`` property in the file).
- The folder in your project where the CLI will put the **models** and **connection resources** that it will generate automatically. (``dest`` property in the file).
- The folder in your project where you define your custom validation schemas. (``schemas`` property in the file).

To do this, create a simple JSON file wherever you want in your project, and complete the file like this:

````

{	
	"server": "your_server", //e.g:      mongodb+srv://
	"cluster": "your_cluster", // e.g:   cluster0-417hl.mongodb.net
	"users":{
		"dev":{"name": "your_dev_user", "password": "your_dev_user_password"},
		"prod": {"name": "your_prod_user", "password": "your_prod_user_password"},
		"admin": {"name": "your_admin_user", "password": "your_admin_user_password"}
	},	
	"database": "your_database_name",
	"dest": "your_data_folder", // models and connection resources folder, e.g: src/server/data
	"schemas": "your_schemas_folder" // your custom validation schemas folder, e.g: src/server/schemas
}

````

### Install the CLI
`npm install kokoro-dai-mongo-atlas-connect --save-dev`.

### Add the CLI in your package.json
In the section scripts of your project's package.json file, add: `mongo-atlas --config src/connect.config.json`.

`mongo-atlas` is the command for init the CLI, 
`--config` is the flag to indicate the source of the config file you created above (here it is defined as src/connect.config.json, but you have to replace it for yours).

Your package.json should look like this:

````
//package.json
  ...,
  "scripts": {
    ...,
    //replace 'src/connect.config.json' for your config file path
    "mongo-connect": "mongo-atlas --config src/connect.config.json", 
    ...
  },...

````

## Running de CLI

``npm run mongo-connect``

The interface will prompt you to type a command.

The first time you use this CLI, you shall want to see its available commands. If so, type help, and you'll get the following list:

- `connect`: connect to a database provider and tests the connection.
- `collections`: get the collections list of a given database. This command has a flag defined as **--schemas**.  `collections --schemas` command updates validations schemas remotely, from the custom schemas defined locally.
- `generate`: generates files needed for making transactions with the database. This command has two flags:
    1. **--factory**: `generate --factory` command generates the main resources to make transactions with your database.
    2. **--models**: `generate --models` command generates the models based on the validation schemas defined for the database in the folder you specified previously in the config file.
- `g`: is an alias for the `generate` command. So, you can type `generate --factory` or `g --factory` / `generate --models` or `g --models`.
- `stats`: get statistics on the underlying operating system and resources utilization. This command has the flag **--db**. `stats --db` command gets statistics data from the database defined in the config file previously.
- `help`: show the CLI's available commands.
- `exit`: kill the CLI.

#### Resume of the CLI's commands:
| Command     | Flag        | Description                                              |
| ------------|-------------|----------------------------------------------------------|
| connect     |             | connect to a database provider and tests the connection.|
| collections |             | gets the collections list of a given database.           |
|             | --schemas   | update validations schemas remotely from the custom schemas defined locally.|
| generate    | --factory   | generate the main transaction resources.|
|             | --models    | generate the models based on the validation schemas defined for the database.| 
| g           |             | alias for the **generate** command.                      |
| stats       |             | get statistics on the underlying operating system and resources utilization.
|             | --db        | get statistics data from the database defined in the config file.|
| help        |             | show the CLI's available commands.|
| exit        |             | kill the CLI.|



### Testing the database connection
Type `connect` in the CLI.

If the database connection is successful, the CLI will show the message **Successful connection**; otherwise, the CLI will show an error.

### Getting Collections List
Run the CLI and type `collections`.

The CLI will check the available collections in the database, and it will show them in a list.

### Updating Validations Schemas
If you have defined custom validations schemas for your database, you can update them remotely. If you did not use validation schemas before, [check this link](https://docs.mongodb.com/manual/core/schema-validation/).

As an example, let's create a validation schema for a simple collection called role:

````

role.json

{
   "validator": { 
      "$jsonSchema": {
         "bsonType": "object",
         "required": [ "role" ],
         "properties": {
            "role": {
               "bsonType": "string",
               "description": "must be a string and is required"
            },            
            "code": {
               "bsonType": "string",
               "description": "must be a string"
            }
         }
      } 
   },
   "validationLevel": "strict",
   "validationAction": "error"

}

````

Make sure that this file is in the directory defined in your config file previously (`schemas` property).

Once you defined the validators schemas, run the CLI and type `collections --schemas`. The CLI will create or update these schemas remotely.

### Generating transaction resources

Run the CLI and type `generate --factory`.

When you run this command, three files are generated to make transactions in your database: 
1. MongoConnectFactory.js: this file manages the connection with the database. 
2. MongoTrasactionFactory.js: this file defines the most common CRUD operations. 
3. MongoConfigFactory.js: this file stores the string database connection for different environments. 

The CLI saves these files in the directory that you have declared in your config file previously (`dest` property).

### Generating models

Run the CLI and type `generate --models`.

Once you run this command, the CLI generates the models based on the validation schemas you have defined.

Following the validation schema of our example above, its model generated will be:

````
//RoleModel

const Connection = require('./MongoConnectFactory');

const MongoTransaction = require('./MongoTransactionFactory');

let roleTransaction = null;

const connectCollection = async (collectionName) => {

	if((roleTransaction === null)){

		const collection = await Connection.getCollection(collectionName);		

		roleTransaction = new MongoTransaction(collection);

	}
        
}

let roleModel = async () =>{

	await connectCollection('role'); 	

	return roleTransaction;

};


// Export Model
module.exports = roleModel;

````

## How to use the generated models
````
const RoleModel = require('../data/RoleModel'); //url to your model

const __roleModel = await RoleModel();  

//Insert a new role
await __roleModel.insert({role: "user", code: "USR"});

//Count roles in the collection
const count = await __roleModel.count();

````

### Extending models functionalities
Each model the CLI generates has the following functions:
- findOne(criteria[, options]).
- find(criteria[, options]).
- insert(data[, options]).
- update(criteria, data[, options]).
- remove(data[, options]).
- findAndModify(criteria, newValues).
- findAndDelete(criteria).
- count(filter).
- distinct(criteria[, filter]).

If you want to add other functionalities to the model, you can modify it like this:
````
//RoleModel

...

let roleModel = async () =>{

	await connectCollection('role'); 

	//Extend roleTransaction functionalities
	roleTransaction.updateCustomerCode = async (newCode) => {
		roleTransaction.collection.updateOne({code: "CUS"}, {$set: newCode}, {w: 1});
	}	

	return roleTransaction;

};


// Export Model
module.exports = roleModel;

````

### Getting database stats

Run the CLI and type `stats --db`.