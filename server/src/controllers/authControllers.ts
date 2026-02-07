import { Request, Response } from "express";
import { signupSchema, signinSchema } from "../schemas/authSchema.js";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";

export const signupController = async (req: Request, res: Response) => {
  const parsedData = signupSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({
        message: "Invalid format",
        error: parsedData.error.flatten().fieldErrors,
      });
  }

  const { email, displayname, password } = parsedData.data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        displayname,
        password: hashedPassword,
      },
    });
    const token = generateToken(user.id);
    res.json({
      token,
      data: { displayname: user.displayname, id: user.id },
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Invalid credentials or User already exists" });
  }
};

export const signinController = async (req: Request, res: Response) => {
  const parsedData = signinSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid format",
      errors: parsedData.error.flatten().fieldErrors,
    });
  }
  const { email, password } = parsedData.data;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    return res.status(401).json({ message: "User not found" });
  }
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (passwordMatch) {
    const token = generateToken(existingUser.id);
    return res.json({
      token,
      data: { displayname: existingUser.displayname, id: existingUser.id },
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
