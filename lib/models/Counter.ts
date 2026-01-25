import mongoose, { Schema, Document } from "mongoose";

export interface ICounter extends Document {
  seq: number;
}

const CounterSchema = new Schema<ICounter>({
  seq: { type: Number, default: 0 },
});

export default mongoose.models.Counter ||
  mongoose.model<ICounter>("Counter", CounterSchema);
