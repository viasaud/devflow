"use server";

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";

import { runWithDatabase } from "../mongoose";

import { viewQuestionParams } from "./shared.types";

export const viewQuestion = async (params: viewQuestionParams) => {
  return await runWithDatabase(async () => {
    const { userId, questionId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return;

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  });
};
