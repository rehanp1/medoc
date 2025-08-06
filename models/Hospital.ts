import { Schema, model } from "mongoose";

export interface HospitalType {
  name: string;
  address: string;
}

const HospitalSchema = new Schema<HospitalType>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

const Hospital = model<HospitalType>("Hospital", HospitalSchema);

export default Hospital;
