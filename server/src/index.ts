import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/authRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";

const app = express();

const port = PORT;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/session", sessionRouter);
app.get("/", (req, res) => {
  res.send("Testing ");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
