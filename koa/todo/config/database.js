const { MongoClient } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionUrl);

const connectDB = async () => {
  console.log("Connecting MongoDb");
  await client
    .connect()
    .then(() => {
      console.log("Connected to MongoDb");
      
    })
    .catch((err) => {
      console.error("Failed to connect MongoDb\n", err);
      process.exit(0);
    });
};

module.exports = { connectDB, client };
