'use strict';

let db = require('mongoose');

class Db{
	static connect(){
		db.connect(process.env.MONGODB_URI || 'mongodb://localhost/crudnode',{useNewUrlParser: true})
		.then(db => console.log('db is conected'))
		.catch(err => console.log(err));
	}
}

module.exports = Db;