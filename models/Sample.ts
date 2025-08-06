import { Schema, model } from "mongoose";

export interface SampleType {
  agentId: string;
  hospitalId: string;
  status: "pending" | "collected" | "delayed";
  scheduledAt: Date;
  collectedAt?: Date | null;
  delayed?: boolean;
}

const SampleSchema = new Schema<SampleType>({
  agentId: { type: String, required: true },
  hospitalId: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "collected", "delayed"],
    default: "pending",
  },
  scheduledAt: { type: Date, required: true },
  collectedAt: { type: Date },
  delayed: { type: Boolean, default: false },
});

const Sample = model<SampleType>("Sample", SampleSchema);

export default Sample;
