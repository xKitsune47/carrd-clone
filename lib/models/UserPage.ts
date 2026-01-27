import mongoose, { Schema, Document } from "mongoose";
import Counter from "./Counter";

export interface ILink {
  title: string;
  url: string;
  order: number;
}

export interface IUserPage extends Document {
  userId: number;
  username: string;
  email: string;
  image?: string;
  description?: string;
  links: ILink[];
  theme?: string;
  font?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getNextUserId(): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return counter.seq;
}

const LinkSchema = new Schema<ILink>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

const UserPageSchema = new Schema<IUserPage>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    links: { type: [LinkSchema], default: [] },
    theme: { type: String, default: "soft-neutral" },
    font: { type: String, default: "Manrope" },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.UserPage ||
  mongoose.model<IUserPage>("UserPage", UserPageSchema);
