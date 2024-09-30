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

// token Auth Middleware
// tokenIdentificationMiddleware - that's what we're doing here
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("This is the auth middleware!");
  console.log(req.body);

  // Check if the provided credentials exist
  // Check the provided bearer token if it exists
  // decode it
  // check to see if there is a matching user
  // if there is, modify the request to include the user
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
