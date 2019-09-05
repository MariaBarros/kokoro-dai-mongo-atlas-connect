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
	"schemas": "your_schemas_folder" // folder where you define your custom validation schemas, e.g: src/server/schemas
}

````

### Install the CLI
`npm install kokoro-dai-mongo-atlas-connect --save-dev`.

### Add the CLI in your package.json
In the section scripts of your project's package.json file, add: `mongo-atlas --config src/connect.config.json`.
`mongo-atlas` is the command for init the CLI, `--config` is the flag to indicate the source of the config file you created above (here it is defined as src/connect.config.json, you have to replace it for yours).

Your package.json should look like this:

````
//package.json
  ...,
  "scripts": {
    ...,
    "mongo-connect": "mongo-atlas --config src/connect.config.json", //replace 'src/connect.config.json' for your config file path
    ...
  },...

````