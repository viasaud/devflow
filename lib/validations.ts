import { z } from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(20, "Title is too short").max(120, "Title is too long"),
  description: z
    .string()
    .min(50, "Description is too short")
    .max(3000, "Description is too long"),
  tags: z
    .array(z.string().min(2, "Tag is too short").max(15, "Tag is too long"))
    .min(1, "Please select at least one tag")
    .max(3, "You can only select up to 3 tags"),
});

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(50, "Answer is too short")
    .max(3000, "Answer is too long"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name is too short").max(20, "Name is too long"),
  username: z
    .string()
    .min(3, "Username is too short")
    .max(20, "Username is too long"),
  location: z
    .string()
    .min(2, "Location is too short")
    .max(20, "Location is too long"),
  bio: z.string().max(300, "Bio is too long"),
});
