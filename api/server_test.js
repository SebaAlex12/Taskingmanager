const express = require("express");
const http = require("http");

const basePath = process.env.BASEPATH || '/';
const app = express();


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

const port = process.env.PORT || 5000;

const server = http
  .createServer(app)
  .listen(port, () => console.log(`server running on port ${port}`));