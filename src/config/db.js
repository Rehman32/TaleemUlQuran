const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('⚠️  MONGODB_URI not set — running without database.');
      return;
    }

    // Disable buffering so operations fail immediately if not connected
    mongoose.set('bufferCommands', false);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connected successfully');
    console.log('   Database:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('   Full error:', err);
  }
};

// Log connection events
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

module.exports = connectDB;
