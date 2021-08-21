const mongoose = require("mongoose");

const MONGODB_URI = process.env.mongodb_connection_uri || "mongodb+srv://lonewolf:sA6Aa6butEpjdfX2@serverless-mongodb.q3fp5.mongodb.net/expert-coder?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};

module.exports = { connectToDatabase };