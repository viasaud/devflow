"use server";

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";

import { connectToDatabase } from "../mongoose";

import { viewQuestionParams } from "./shared.types";

export const viewQuestion = async (params: viewQuestionParams) => {
  try {
    connectToDatabase();

    const { userId, questionId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 0.5 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction)
        return console.log("The user already viewed the Question");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
