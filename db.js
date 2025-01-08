const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Detiene el servidor si no se puede conectar
  }
};

module.exports = connectDB;

/* require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error conectándose a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
 */
