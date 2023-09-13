const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const http = require("http");
// const socketIo = require("socket.io");

const graphql = require("express-graphql");
const graphqlSchema = require("./graphql/schema_old");
const graphqlResolver = require("./graphql/resolvers");

// const { fetchAllTasks } = require("./Api/Tasks");

const { upload, resize } = require("./utils/filesManager");

// imports from api - dont forget change out_db_config connection
// const { getImports } = require("./imports/api/index");

// imports from mysql joomla - dont forget change out_db_config connection
// const { getImports } = require("./imports/mysql_joomla/index");

// imports from mysql wordpress - dont forget change out_db_config connection
// const { getImports } = require("./imports/mysql_wordpress/index");

const fs = require("fs");
const cors = require("cors");

const app = express();

const basePath = process.env.BASEPATH || '/';

app.use(basePath + 'test',(req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});

app.use(basePath + 'show',(req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const response = 'Base path is: !\n';
    res.end(response);
});
/*
app.use(
  basePath + "graphql",
  graphql.graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);
*/
const port = process.env.PORT || 5000;

const server = http
  .createServer(app)
  .listen(port, () => console.log(`server running on port ${port}`));
  
/*  
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
server.listen();*/