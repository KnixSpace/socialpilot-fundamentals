const { MongoClient } = require("mongodb");

const connectionUri = process.env.MONGO_LOCAL_URI;
const client = new MongoClient(connectionUri);

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
