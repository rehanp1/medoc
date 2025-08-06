import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import Agent from "../models/Agent";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashedpwd = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedpwd,
    };

    const result = await Agent.create(user);

    res.status(201).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingAgent = await Agent.findOne({ email });

    if (!existingAgent)
      return res.status(400).json({
        success: false,
        message: "Agent does not exists with this email",
      });

    const isMatch = await bcrypt.compare(password, existingAgent.password);

    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Password is Invalid",
      });

    const payload = {
      id: existingAgent._id,
      name: existingAgent.name,
      email: existingAgent.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY || "secretKey", {
      expiresIn: "1h",
    });

    res.status(201).json({ success: true, result: { ...payload, token } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
