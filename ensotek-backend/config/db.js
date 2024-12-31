const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb://localhost:27017/ensotek'; // Manuel URI
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;


