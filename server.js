const express = require("express");
const mainRouter = require("./routers/routes");
const server = express();

server.use(express.json());

server.use("/api/", mainRouter);

server.get("/", async (req, res) => {
  res.send(`
    <h1>Node Blog API</h1>
    <p>Welcome to Node Blog API</p>
  `);
});

module.exports = server;
