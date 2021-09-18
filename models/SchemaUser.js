'use strict';

let {Schema,model} = require('mongoose');

let userSchema = new Schema({
  createAt:{ 
    type:Date, 
    default: new Date(),
    required:[true, '{PATH} is required.']
  },
	name:{
		type:String,
		lowercase: true,
    required:[true, '{PATH} is required.']
	},
	lastName :{
		type:String,
		lowercase: true,
		required:[true, '{PATH} is required.']
	},
	mail:{
		type:String,
    unique : true,
		required:[true, '{PATH} is required.']
	},
	ci:{
		type:String,
    unique:true,
    required:[true, '{PATH} is required.']
	},
  phone : {
    type:String,
    unique:true,
    required:[true, '{PATH} is required.']
  }
})

module.exports = model('User',userSchema);