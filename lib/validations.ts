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
