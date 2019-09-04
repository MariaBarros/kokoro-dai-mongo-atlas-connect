const mongoConn = require('./MongoConfig');

const MongoClient = require('mongodb').MongoClient;

const Connect = async() => {

    const optionConn = { useNewUrlParser: true, useUnifiedTopology: true };            	

    return await MongoClient.connect(mongoConn.connection, optionConn).catch((err) =>{

		console.log(`Imposible to connect to ${mongoConn.connection}. Verify the string connection.`);        	

    });		

};

let MongoConnect = () => {

	let db = null;    

    const Get = async () => {	   	

	    return (db != null) ? db : await Connect();	    
        
    }

    const getCollection = async (collectionName) =>{

	   	if (!db) {

	   		const client = await Connect();

			db = client.db(client.s.options.dbName);

	    } 

		return await db.collection(collectionName);	    
	                
	}

    return {

        Get: Get,

        getCollection: getCollection

    }	
};


// Export Connect
module.exports = MongoConnect();