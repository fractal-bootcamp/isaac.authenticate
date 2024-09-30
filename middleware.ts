import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import jwt from "jsonwebtoken";
import { TestCredentials } from "./index.ts";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Time:", Date.now());
  next();
};

// look into how the jsonwebtoken
type JWTUserPayload = {
  userId: string;
  userName: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("This is the auth middleware!");
  // console.log(res); // This will output a really long response - literally everything
  console.log(req.body);
  // We need to modify the request, that's the big idea here

  if (
    req.body.username == TestCredentials.username &&
    req.body.password == TestCredentials.password
  ) {
    console.log("Success!");

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(
      { username: req.body.username },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    console.log(accessToken);

    next();
  } else {
    console.log("Failure!");
    res.status(401).json({ message: "Unauthorized" });
  }
};

/* NOTES BELOW */

// curl format below
// curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://www.example.com
// curl -H "Authorization: Bearer ASDF" localhost:8080/login

/* HOW TO DO A BASIC POST REQUEST VIA CURL! - https://www.warp.dev/terminus/curl-post-request

Here's an example command

curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpassword"}'

This code will get a response back from the app.post("login") method we made

*/
