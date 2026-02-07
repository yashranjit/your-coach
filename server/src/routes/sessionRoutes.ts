import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  endsessionController,
  gethistoryController,
  startsessionController,
} from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.post("/start", authMiddleware, startsessionController);

sessionRouter.put("/end", authMiddleware, endsessionController);

sessionRouter.get("/history", authMiddleware, gethistoryController);

export default sessionRouter;
