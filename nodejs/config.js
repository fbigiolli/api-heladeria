const { dbConnection } = require('./db/dbConnection');


dbConnection().then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });