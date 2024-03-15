import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  savedQuestions: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  avatar: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  savedQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", userSchema);
