import { Router } from "express";
import { addLog, createLogsCollection } from "./logs.service.js";

const logsRouter = Router();

logsRouter.get("/createLogsCollection", createLogsCollection);
logsRouter.post("/addLog", addLog);

export default logsRouter;
