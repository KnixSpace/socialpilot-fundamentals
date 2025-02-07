const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_LOCAL_URI);

const connectDB = async () => {
  await client
    .connect()
    .then(() => {
      console.log("Connected to db...");
    })
    .catch((err) => {
      console.log("Falied to connect with db\n", err);
      process.exit(0);
    });
};

module.exports = { connectDB, client };
