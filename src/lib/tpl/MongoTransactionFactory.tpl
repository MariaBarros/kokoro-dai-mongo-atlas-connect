const Connection = require('./MongoConnectFactory');

class MongoTransaction{	

	constructor(collection){

		this.collection = collection;

	}

	setOptions(defaultOptions, options) {

		return Object.assign(defaultOptions, options); 	
		
	}

	async findOne (criteria, options = {}) {
		
		return await this.collection.findOne(criteria, options);
			
	};

	async find (criteria, options = {}) {

		return await this.collection.find(criteria, options);

	};

	async insert(data, options = {}) {

		return await this.collection.insertOne(data, this.setOptions({w:1}, options));

	};

	async update(criteria, data, options = {}){

		return await this.collection.updateOne(criteria, {$set: data}, this.setOptions({w:1}, options));
	                
	}

	async remove (data, options){

		return await this.collection.deleteOne(data, this.setOptions({w:1}, options));	

	};

	async findAndModify (criteria, newValues, sort = [], options = {}) {		

		return await this.collection.updateMany(criteria, {$set: newValues}, {multi:true, w: 1});
	                
	}

	async findAndDelete (criteria) {		

		return await this.collection.deleteMany(criteria, {multi:true, w: 1});
	                
	}

	async count(filter = null) {	

		return (filter!== null) ? await this.collection.countDocuments(filter) 

			: await this.collection.countDocuments();	

	};

	async distinct(criteria, filter = {}) {	

		return await this.collection.distinct(criteria, filter);	

	};
	
}

module.exports = MongoTransaction;