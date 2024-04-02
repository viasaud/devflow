"use server";

import { revalidatePath } from "next/cache";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";

import { connectToDatabase } from "../mongoose";

import { createAnswerParams, getAnswersParams } from "./shared.types";

export const createAnswer = async (params: createAnswerParams) => {
  try {
    connectToDatabase();

    const { author, question, content, path } = params;

    const newAnswer = await Answer.create({
      author,
      question,
      content,
    });

    await Question.findByIdAndUpdate(question, { $push: { answers: newAnswer._id } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = async (params: getAnswersParams) => {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId }).populate("author").sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
  }
};
