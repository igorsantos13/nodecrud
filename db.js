require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')

let singleton;

async function connect(){
  if(singleton) return singleton

  const client = new MongoClient(process.env.CONNECTION_STRING)
  
  try{
    await client.connect()
    singleton = client.db('CRUD')

    return singleton

  }catch(e){
    console.log(e)
  }
  
}

async function insert(customer){
  const db = await connect()
  return db.collection('crudCustomer').insertOne(customer)
}

async function list(){
  const db = await connect()
  return db.collection('crudCustomer').find().toArray()
}

async function removeCustomer(id){
  const db = await connect()
  return db.collection('crudCustomer').deleteOne({_id: new ObjectId(id)})
}

async function updateCustomer(id, name){
  const db = await connect()
  return db.collection('crudCustomer').updateOne({_id: new ObjectId(id)}, {$set: {name}})
}

module.exports = {
  insert,
  list,
  removeCustomer,
  updateCustomer
}
