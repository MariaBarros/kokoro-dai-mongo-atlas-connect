const Connection = require('./MongoConnectFactory');

const MongoTransaction = require('./MongoTransactionFactory');

let collection = null;

let $modelNameTransaction = null;

class __transaction extends MongoTransaction{};

const connectCollection = async (collectionName) => {

	if((collection === null)){

		collection = await Connection.getCollection(collectionName);		

		$modelNameTransaction = new __transaction(collection);

	}

	return collection;	
        
}

let $modelNameModel = async () =>{

	await connectCollection('$modelName'); 	

	return $modelNameTransaction;

};


// Export Model
module.exports = $modelNameModel;