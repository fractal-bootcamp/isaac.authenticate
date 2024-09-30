import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { logMiddleware } from "./middleware";
import { authMiddleware } from "./middleware";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(logMiddleware); // This will run on any request with the .use parameter

const users = {
  id: 1,
  id: 2,
};

// Quick and simple test, do curl localhost:8080/hello and it should work
app.get("/hello", (req, res) => {
  res.send("hello");
});

// Add authMiddleware as the second parameter to apply it only to this route
app.post("/login", authMiddleware, (req, res, next) => {
  const userCredentials = req.body; // For later
  res.send({
    message: "Post req successful",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

console.log("Hello via Bun!");
