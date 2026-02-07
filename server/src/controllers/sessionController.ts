import { Response } from "express";
import {
  startsessionSchema,
  endsessionSchema,
} from "../schemas/sessionSchema.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import prisma from "../lib/prisma.js";

export const startsessionController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized " });

    // validate input
    const parsedData = startsessionSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ errors: parsedData.error.flatten().fieldErrors });
    }

    const {
      plannedStartTime,
      plannedEndTime,
      focusDuration,
      breakDuration,
      plannedCycles,
    } = parsedData.data;
    // save to database
    const session = await prisma.focusSession.create({
      data: {
        userId,
        plannedStartTime,
        plannedEndTime,
        focusDuration,
        breakDuration,
        plannedCycles,
        status: "ONGOING",
      },
    });

    res.json({ message: "Session started", sessionId: session.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const endsessionController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const parsedData = endsessionSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ errors: parsedData.error.flatten().fieldErrors });
    }
    const {
      sessionId,
      completedCycles,
      incompleteCycles,
      status,
      totalFocusTime,
    } = parsedData.data;

    const updatedSession = await prisma.focusSession.update({
      where: { id: sessionId },
      data: {
        completedCycles,
        incompleteCycles,
        status,
        totalFocusTime,
        actualEndTime: new Date(),
      },
    });

    res.json({
      message: "Session saved successfully",
      session: updatedSession,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save session" });
  }
};

export const gethistoryController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const sessions = await prisma.focusSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json({ sessions });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
