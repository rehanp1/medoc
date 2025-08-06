import { Response, Request } from "express";
import Sample from "../models/Sample";

export const addSample = async (req: Request, res: Response) => {
  try {
    const { hospitalId, agentId, scheduledAt, collectedAt } = req.body;

    const result = await Sample.create({
      hospitalId,
      agentId,
      scheduledAt,
      collectedAt,
    });

    res.status(201).json({ success: true, message: "Sample Added" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markSampleCollected = async (req: Request, res: Response) => {
  try {
    const { sampleId } = req.params;

    const result = await Sample.updateOne(
      { _id: sampleId },
      { status: "collected" }
    );

    res
      .status(200)
      .json({ success: true, message: "Sample status updated to Collected" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markSampleDelay = async (req: Request, res: Response) => {
  try {
    const { sampleId } = req.params;

    const result = await Sample.updateOne(
      { _id: sampleId },
      { status: "delay" }
    );

    res
      .status(200)
      .json({ success: true, message: "Sample status updated to Delay" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSamples = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;

    const result = await Sample.find({ agentId });

    res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
