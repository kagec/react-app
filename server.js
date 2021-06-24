const fs = require("fs");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const db = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const SECRET_KEY = "abcdefg";

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/signin", (req, res) => {
  const { email, id } = req.body;
  const OPTION = {
    expiresIn: "30m",
  };

  if (!db.users.some((user) => user.email === email && user.id === id)) {
    res.status(401).json("Unauthorized");
    return;
  }

  const token = jwt.sign({ email, id }, SECRET_KEY, OPTION);
  res.status(200).json({ token });
});

server.use((req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    res.status(401).json("Unauthorized");
    return;
  }

  try {
    jwt.verify(req.headers.authorization.split(" ")[1], SECRET_KEY);
    next();
  } catch (e) {
    res.status(401).json("Unauthorized");
  }
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running PORT 5000");
});
