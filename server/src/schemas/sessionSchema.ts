import z from "zod";

export const startsessionSchema = z.object({
  plannedStartTime: z.string().datetime(),
  plannedEndTime: z.string().datetime(),
  focusDuration: z.number().min(1),
  breakDuration: z.number().min(1),
  plannedCycles: z.number().min(1),
});

export const endsessionSchema = z.object({
  sessionId: z.string(),
  completedCycles: z.number().min(0),
  incompleteCycles: z.number().min(0),
  status: z.enum(["COMPLETED", "ABORTED"]),
  totalFocusTime: z.number().min(0),
});
