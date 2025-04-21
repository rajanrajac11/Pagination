import express from "express";
const app = express();
import { User } from "./models/users.model.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/pagination");
const db = mongoose.connection;
db.once("open", async () => {
  if ((await User.countDocuments().exec()) > 0) return;

  Promise.all([
    User.create({ name: "User 1" }),
    User.create({ name: "User 2" }),
    User.create({ name: "User 3" }),
    User.create({ name: "User 4" }),
    User.create({ name: "User 5" }),
    User.create({ name: "User 6" }),
    User.create({ name: "User 7" }),
    User.create({ name: "User 8" }),
    User.create({ name: "User 9" }),
    User.create({ name: "User 10" }),
    User.create({ name: "User 11" }),
    User.create({ name: "User 12" }),
    User.create({ name: "User 13" }),
    User.create({ name: "User 14" }),
    User.create({ name: "User 15" }),
    User.create({ name: "User 16" }),
    User.create({ name: "User 17" }),
    User.create({ name: "User 18" }),
    User.create({ name: "User 19" }),
    User.create({ name: "User 20" }),
  ]).then(() => {
    console.log("Data seeded successfully");
  });
});

app.get("/users", paginatedResults(User), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    //if the endIndex is less than the length of the model, then there are more results to be fetched
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    //if the startIndex is greater than 0, then there are previous results to be fetched
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
app.listen(3001);
