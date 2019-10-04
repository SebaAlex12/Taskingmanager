import mongoose = require("mongoose");
import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");

import graphqlHttp = require("express-graphql");
import graphqlSchema = require("./graphql/schema_old");
import graphqlResolver = require("./graphql/resolvers");

const app: express.Application = express();

import fs = require("fs");

const bodyParserJson = bodyParser.json({ limit: "50mb" });
const bodyParserUrlencoded = bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
});

// DB config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));

// serv assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
