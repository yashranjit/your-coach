import { Router } from "express";
import { signupController } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", signupController);

export default authRouter;
