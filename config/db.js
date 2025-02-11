const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('db_name');// DB NAME
        console.log('Connected to MongoDB');
    } catch(error) {
        console.error('Error connecting to MongoDB', error);
    }
}


const getDB = () => db;

module.exports = { connectDB, getDB };