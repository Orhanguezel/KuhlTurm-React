const mongoose = require('mongoose');
const connections = {};

const connectDB = async (dbName) => {
    if (connections[dbName]) {
        return connections[dbName];
    }
    try {
        const conn = mongoose.createConnection(`${process.env.MONGO_URI}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        conn.on('connected', () => console.log(`MongoDB connected to ${dbName}`));
        conn.on('error', (err) => console.error(`MongoDB error on ${dbName}:`, err.message));

        connections[dbName] = conn;
        return conn;
    } catch (err) {
        console.error(`MongoDB connection error for ${dbName}:`, err.message);
        throw err;
    }
};

module.exports = connectDB;











