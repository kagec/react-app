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
  const { email, password } = req.body;
  const OPTION = {
    expiresIn: "1m",
  };

  if (
    db.users.findIndex(
      (user) => user.email === email && user.password === password
    ) === -1
  ) {
    res.status(401).json("Unauthorized");
    return;
  }

  const token = jwt.sign({ email, password }, SECRET_KEY, OPTION);
  res.status(200).json({ token });
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running PORT 5000");
});
