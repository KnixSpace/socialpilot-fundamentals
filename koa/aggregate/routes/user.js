const Router = require("@koa/router");
const router = new Router();
const { client } = require("../config/database");
const userCollection = client.db("aggregate").collection("users");
const dataCollection = client.db("aggregate").collection("data");
const bookCollection = client.db("aggregate").collection("books");

router.get("/insert/user", async (ctx) => {
  await userCollection.insertMany(ctx.request.body);
  ctx.body = "added user";
});

router.get("/insert/data", async (ctx) => {
  await dataCollection.insertMany(ctx.request.body);
  ctx.body = "added order";
});

router.get("/insert/books", async (ctx) => {
  await bookCollection.insertMany(ctx.request.body);
  ctx.body = "added products";
});

router.get("/query/match", async (ctx) => {
  const data = await orderCollection
    .aggregate([{ $match: { status: "shipped" } }])
    .toArray();
  ctx.body = data;
});

router.get("/query/group", async (ctx) => {
  const data = await orderCollection
    .aggregate([
      {
        $group: {
          _id: "$userId",
          doc: { $push: "$$ROOT" },
        },
      },
    ])
    .toArray();

  ctx.body = data;
});

router.get("/query/unwind", async (ctx) => {
  const data = await orderCollection
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$userId",
          totalSpent: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
    ])
    .toArray();

  ctx.body = data;
});

router.get("/query/1", async (ctx) => {
  const data = await orderCollection
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalQuantitySold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuanitySold: -1 } },
      { $limit: 3 },
    ])
    .toArray();

  ctx.body = data;
});

router.get("/query/2", async (ctx) => {
  const data = await orderCollection
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
    ])
    .toArray();

  ctx.body = data;
});

router.get("/query/3", async (ctx) => {
  const data = await userCollection
    .aggregate([{ $unwind: "$orders" }])
    .toArray();
  ctx.body = data;
});

router.get("/query/4", async (ctx) => {
  const data = await userCollection.updateOne(
    { _id: "Us001" },
    { $pull: { tags: "innovation" } }
  );
  ctx.body = data;
});

module.exports = router;
