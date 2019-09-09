const MongoTransaction = require('./MongoTransactionFactory');

let $modelNameTransaction = null;

const connectCollection = async (collectionName) => {

	if(($modelNameTransaction === null)){		

		$modelNameTransaction = new MongoTransaction(collection);

		await $modelNameTransaction.setCollection();

	}	
        
}

let $modelNameModel = async () =>{

	await connectCollection('$modelName'); 	

	return $modelNameTransaction;

};


// Export Model
module.exports = $modelNameModel;