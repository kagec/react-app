const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("todos", (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use((req, res, next) => {
  if (req.method === "PUT") {
    req.body.updatedAt = Date.now();
  }
  next();
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running PORT 5000");
});
