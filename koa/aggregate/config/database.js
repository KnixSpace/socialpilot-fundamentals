const { MongoClient } = require("mongodb");

const connectionUri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionUri);

const connectDB = async () => {
  console.log("Connecting to db...");
  await client
    .connect()
    .then(() => {
      console.log("Connected to db...");
    })
    .catch((err) => {
      console.log("Falied to connect with db\n");
      process.exit(0);
    });
};

module.exports = { connectDB, client };
