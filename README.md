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

### Install MongoDB dependency:
If you want to install this dependency locally, run `npm install mongodb`, otherwise run `npm install -g mongodb`.

### Get the MongoDB string connection from Mongo Atlas
I you have not an account in Mongo Atlas, follow [this steps](https://docs.atlas.mongodb.com/getting-started/) for creating one.

Once you have a Mongo Atlas account, [enter to your planel](https://cloud.mongodb.com/user#/atlas/login), go to the **Clusters** section and click on **Connect** button. Next, select the Connection Method "Connect your Application", choose Node.js as Driver and select your version. Finally, copy your connection string.

The connection string looks like this:

`mongodb+srv://<username>:<password>@cluster0-417hl.mongodb.net/test?retryWrites=true&w=majority`

### Create your configuration file
Create a simple JSON file wherever you want in your project. For example, let's create a json file called connect.config.json in the src folder of your project.