'use strict';

let db = require('./configuration/db');
let User = require('./models/SchemaUser');

module.exports.getAll = async (event,context,callback) => {
  try
  {
    context.callbackWaitsForEmptyEventLoop = false;
    db.connect();

    let users = await User.find({});

    return{
      statusCode : 200,
      body: JSON.stringify({
        data: users
      })
    }
  }
  catch(err)
  {
     return{
      statusCode : err.statusCode || 500,
       body: JSON.stringify({
        data: err
      }) 
    }
  }

};


module.exports.getOne = async (event,context,callback) => {
  try
  {
    context.callbackWaitsForEmptyEventLoop = false;
    db.connect();

    let {_id} = event.pathParameters;

    let user = await User.findOne({_id});
    if(!user) throw {statusCode:400 , message:'user not exist!'};

    return{
      statusCode : 200,
      body: JSON.stringify({
        data: user
      })
    }
  }
  catch(err)
  {
    return{
      statusCode : err.statusCode || 500,
       body: JSON.stringify({
        data: err.message
      }) 
    }
  }
};


module.exports.create = async (event,context,callback) => {
  try
  {
    context.callbackWaitsForEmptyEventLoop = false;
    db.connect();

    let data = JSON.parse(event.body);

    let result = await User.create(data);
    
    return{
      statusCode : 201,
      body: JSON.stringify({
        data: 'user created!'
      })
    }
  }
  catch(err)
  {
    return{
      statusCode : err.statusCode || 500,
       body: JSON.stringify({
        data: err.message || 'Error'
      }) 
    }
  }
  
};


module.exports.edit = async (event,context,callback) => {
  try
  {
    context.callbackWaitsForEmptyEventLoop = false;
    db.connect();

    let {_id} = event.pathParameters;

    let data = JSON.parse(event.body);

    let result = await User.updateOne({_id:_id},{$set:data});
    if(result.modifiedCount===0) throw {statusCode:400,message:'Not updated!'};

    return{
      statusCode : 201,
      body: JSON.stringify({
        data: 'Was successfully updated!'
      })
    }
  }
  catch(err)
  {
    return{
      statusCode : err.statusCode || 500,
       body: JSON.stringify({
        data: err.message || 'Error'
      }) 
    }
  }

};


module.exports.delete = async (event,context,callback) => {
  try
  {
    context.callbackWaitsForEmptyEventLoop = false;
    db.connect();

    let {_id} = event.pathParameters;;

    let result = await User.deleteOne({_id});
    console.log(result)
    if(result.deletedCount===0) throw {statusCode:400,message:'Not delete!'};

    return{
      statusCode : 201,
      body: JSON.stringify({
        data: 'User deleted!'
      })
    }
  }
  catch(err)
  {
    return{
      statusCode : err.statusCode || 500,
       body: JSON.stringify({
        data: err.message || 'Error'
      }) 
    }
  }

};

