"use server";

import { revalidatePath } from "next/cache";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";

import { runWithDatabase } from "../mongoose";

import {
  answerVoteParams,
  createAnswerParams,
  getAnswersParams,
} from "./shared.types";

export const createAnswer = async (params: createAnswerParams) => {
  const { author, question, content, path } = params;
  return await runWithDatabase(async () => {
    const newAnswer = await Answer.create({
      author,
      question,
      content,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  });
};

export const getAnswers = async (params: getAnswersParams) => {
  const { questionId } = params;
  return await runWithDatabase(async () => {
    const answers = await Answer.find({ question: questionId })
      .populate("author")
      .sort({ createdAt: -1 });

    return answers;
  });
};

export const upVoteAnswer = async (params: answerVoteParams) => {
  const { answerId, userId, hasUpVoted, hasDownVoted, path } = params;
  return await runWithDatabase(async () => {
    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) throw new Error("Answer not found");

    revalidatePath(path);
  });
};

export const downVoteAnswer = async (params: answerVoteParams) => {
  const { answerId, userId, hasUpVoted, hasDownVoted, path } = params;
  return await runWithDatabase(async () => {
    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $push: { downVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) throw new Error("Answer not found");

    revalidatePath(path);
  });
};
