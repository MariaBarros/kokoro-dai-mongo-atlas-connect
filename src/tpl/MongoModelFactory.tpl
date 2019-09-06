const Connection = require('./MongoConnectFactory');

const MongoTransaction = require('./MongoTransactionFactory');

let $modelNameTransaction = null;

const connectCollection = async (collectionName) => {

	if(($modelNameTransaction === null)){

		const collection = await Connection.getCollection(collectionName);		

		$modelNameTransaction = new MongoTransaction(collection);

	}	
        
}

let $modelNameModel = async () =>{

	await connectCollection('$modelName'); 	

	return $modelNameTransaction;

};


// Export Model
module.exports = $modelNameModel;