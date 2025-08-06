import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestType extends Request {
  agent?: any;
}

export const authenticate = (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res.status(404).json({ success: false, messsage: "Unauthorized" });

    token = token.split(" ")[1];
    const agent = jwt.verify(token, process.env.SECRET_KEY || "secretKey");
    req.agent = agent;
    next();
  } catch (err) {
    return res.json({ message: "Access Denied" });
  }
};
