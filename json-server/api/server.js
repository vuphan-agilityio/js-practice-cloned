const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();

// allow write operations
const fs = require("fs");
const path = require("path");
const filePath = path.join("db.json");
const data = fs.readFileSync(process.cwd() + filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001; // you can use any port number here; i chose to use 3001

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log('JSON Server is running on port: ', port);
});