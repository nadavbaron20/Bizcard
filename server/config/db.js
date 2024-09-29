const mongoose = require('mongoose');

// 'prod' or 'dev' or 'test'
const mode = process.env.NODE_ENV;

let uri; if (mode === 'prod') {
  uri = process.env.MONGODB_URI_PROD;
  console.log('prod mode');
} else if (mode === 'dev') {
  uri = process.env.MONGODB_URI_DEV;
  console.log('dev mode');
} else {
  uri = process.env.MONGODB_URI_TEST;
  console.log('test mode');
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB')
  } catch (err) {
    console.log('Error connecting to MongoDB', err.message)
    process.exit(1)
  }
};

module.exports = connectDB;