import { Request, Response } from "express";
import { signupSchema } from "../schemas/authSchema.js";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";

export const signupController = async (req: Request, res: Response) => {
  const parsedData = signupSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(401)
      .json({ message: "Invalid format", error: parsedData.error });
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
      .status(401)
      .json({ message: "Invalid credentials or User already exists" });
  }
};
