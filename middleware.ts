import type { NextFunction, Request, Response } from "express";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Time:", Date.now());
  next();
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("This is the auth middleware!");
  // get the user from the request authorization header
  // modify the request -- add the user to the req.user
  next();
};

/* NOTES BELOW */

// curl format below
// curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://www.example.com
// First goal right now is to console.log the res.body, and then eventually use curl
// curl -H "Authorization: Bearer ASDF" localhost:8080/login

/* HOW TO DO A BASIC POST REQUEST VIA CURL! - https://www.warp.dev/terminus/curl-post-request

 curl -H 'Content-Type: application/json' \
      -d '{ "title":"foo","body":"bar", "id": 1}' \
      -X POST \
      localhost:8080/login

This code will get a response back from the app.post("login") method we made

*/
