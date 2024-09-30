import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { logMiddleware } from "./middleware";
import { authMiddleware } from "./middleware";

const app = express();
const port = 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(logMiddleware); // This will run on any request with the .use parameter

export const TestCredentials = {
  username: "testuser",
  password: "testpassword",
};

// Quick and simple test, do curl localhost:8080/hello and it should work
app.get("/hello", (req, res) => {
  res.send("hello");
});

// Note - we add authMiddleware as the second parameter to apply it only to this route
app.post("/login", authMiddleware, (req, res, next) => {
  const postCredentials = req.body; // For later
  res.send({
    message: "Post req successful",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
