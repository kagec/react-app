const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const SECRET_KEY = "abcdefg";

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/signup", (req, res) => {
  const { email, password } = req.body;
  const id = db.get("users").value().length + 1;
  const postUser = { id, email, password };
  const OPTION = {
    expiresIn: "5m",
  };
  const user = db
    .get("users")
    .value()
    .some((user) => user.email === email);

  if (user) {
    return res.status(400).json("Already Exists");
  }

  db.get("users").push(postUser).value();
  db.write();

  const token = jwt.sign({ id, email }, SECRET_KEY, OPTION);
  res.status(200).json({ token });
});

server.post("/auth/signin", (req, res) => {
  const { email, password } = req.body;
  const OPTION = {
    expiresIn: "30m",
  };
  const user = db
    .get("users")
    .value()
    .find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json("Unauthorized");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    OPTION
  );
  res.status(200).json({ token });
});

server.use((req, res, next) => {
  const auth = req.headers.authorization?.split(" ");

  if (auth?.[0] !== "Bearer") {
    return res.status(401).json("Unauthorized");
  }

  try {
    jwt.verify(auth[1] ?? "", SECRET_KEY);
    next();
  } catch (e) {
    res.status(401).json("Unauthorized");
  }
});

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running PORT 5000");
});
