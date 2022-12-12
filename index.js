const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Deta } = require("deta");
const env = process.env.NODE_ENV;

const projectKey = process.env.PROJECT_KEY;
const deta = Deta(projectKey);
const db = deta.Base("users");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send({ first_micro_api: "https://exuwbc.deta.dev/", NODE_ENV: env });
});

app.get("/users", async (req, res) => {
  const data = await db.fetch({});
  res.send(data);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await db.get(id);

  res.send(data);
});

app.post("/users", async (req, res) => {
  const result = await db.put(req.body);
  res.send(result);
});

if (env === "development") {
  let port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Listening...", port));
}

module.exports = app;
