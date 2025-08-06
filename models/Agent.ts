import { Schema, model } from "mongoose";

export interface AgentType {
  name: string;
  email: string;
  password: string;
}

const AgentSchema = new Schema<AgentType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Agent = model<AgentType>("Agent", AgentSchema);

export default Agent;
