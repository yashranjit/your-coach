import { Router } from "express";
import {
  signupController,
  signinController,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);

export default authRouter;
