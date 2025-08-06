import { Router } from "express";
import {
  addSample,
  markSampleCollected,
  markSampleDelay,
  getSamples,
} from "../controllers/sampleController";
import { authenticate } from "../middleware/auth.middleware";

const sampleRouter = Router();

sampleRouter.post("/samples", authenticate, addSample);
sampleRouter.get("/samples/agents/:agentId", authenticate, getSamples);
sampleRouter.patch(
  "/samples/:sampleId/collect",
  authenticate,
  markSampleCollected
);
sampleRouter.patch("/samples/:sampleId/delay", authenticate, markSampleDelay);

export default sampleRouter;
