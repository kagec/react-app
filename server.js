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

server.post("/auth/signup", (req, res) => {
  const { email } = req.body;
  OPTION = {
    expiresIn: "5m",
  };
  const user = db.users.some((user) => user.email === email);

  if (user) {
    return res.status(401).json("Unauthorized");
  }

  const token = jwt.sign({ email: email }, SECRET_KEY, OPTION);
  res.status(200).json({ token });
});

server.post("/auth/signin", (req, res) => {
  const { email, password } = req.body;
  const OPTION = {
    expiresIn: "30m",
  };
  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

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
