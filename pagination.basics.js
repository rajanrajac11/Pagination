import express from "express";
const app = express();

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jim Doe" },
  { id: 4, name: "Jack Doe" },
  { id: 5, name: "Jill Doe" },
  { id: 6, name: "Joe Doe" },
  { id: 7, name: "Judy Doe" },
  { id: 8, name: "Jake Doe" },
  { id: 9, name: "Jess Doe" },
  { id: 10, name: "Jasmine Doe" },
  { id: 11, name: "Jordan Doe" },
  { id: 12, name: "Jared Doe" },
  { id: 13, name: "Jenna Doe" },
  { id: 14, name: "Jace Doe" },
  { id: 15, name: "Jules Doe" },
  { id: 16, name: "Jax Doe" },
  { id: 17, name: "Jett Doe" },
  { id: 18, name: "Joni Doe" },
  { id: 19, name: "Joy Doe" },
  { id: 20, name: "Jay Doe" },
];

const posts = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "Post 2" },
  { id: 3, name: "Post 3" },
  { id: 4, name: "Post 4" },
  { id: 5, name: "Post 5" },
  { id: 6, name: "Post 6" },
  { id: 7, name: "Post 7" },
  { id: 8, name: "Post 8" },
  { id: 9, name: "Post 9" },
  { id: 10, name: "Post 10" },
  { id: 11, name: "Post 11" },
  { id: 12, name: "Post 12" },
  { id: 13, name: "Post 13" },
  { id: 14, name: "Post 14" },
  { id: 15, name: "Post 15" },
  { id: 16, name: "Post 16" },
  { id: 17, name: "Post 17" },
  { id: 18, name: "Post 18" },
  { id: 19, name: "Post 19" },
  { id: 20, name: "Post 20" },
];

app.get("/posts", paginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/users", paginatedResults(users), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    endIndex = page * limit;

    const results = {};

    //if the endIndex is less than the length of the model, then there are more results to be fetched
    if (endIndex < model.length) {
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

    results.results = model.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
  };
}

app.listen(3001);
