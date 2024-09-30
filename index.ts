import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { logMiddleware } from "./middleware";
import { authMiddleware } from "./middleware";
import jwt from "jsonwebtoken";

const app = express();
const port = 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(logMiddleware); // This will run on any request with the .use parameter

export const TestCredentials = [
  {
    username: "testuser",
    password: "testpassword",
  },
  {
    username: "testuser1",
    password: "password123",
  },
  {
    username: "sampleuser2",
    password: "mypassword456",
  },
];

// Quick and simple test, do curl localhost:8080/hello and it should work
app.get("/hello", (req, res) => {
  res.send("hello");
});

// Welcome page only if the authmiddleware works
app.get("/welcome", authMiddleware, (req, res) => {});

// Note - we add authMiddleware as the second parameter to apply it only to this route
app.post("/login", authMiddleware, (req, res, next) => {
  const postCredentials = req.body; // For later

  const validUser = TestCredentials.find(
    (cred) =>
      cred.username === req.body.username && cred.password === req.body.password
  );

  if (validUser) {
    console.log("Success!");

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
      console.error("no access token secret, please fix.");
      res.status(500).json({ error: "internal server error" });
      return;
    }
    const accessToken = jwt.sign(
      { username: req.body.username },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    console.log(accessToken);

    res.setHeader("Authorization", `Bearer ${accessToken}`);

    res.send({
      message: "Post req successful",
    });
  } else {
    console.log("Failure!");
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
