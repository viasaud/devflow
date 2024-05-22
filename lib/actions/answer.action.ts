"use server";

import { revalidatePath } from "next/cache";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";

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

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path);
  });
};

export const getAnswers = async (params: getAnswersParams) => {
  const { questionId, page = 1, pageSize = 10 } = params;
  const skip = (page - 1) * pageSize;
  return await runWithDatabase(async () => {
    const answers = await Answer.find({ question: questionId })
      .skip(skip)
      .limit(pageSize)
      .populate("author")
      .sort({ createdAt: 1 });

    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const hasNext = totalAnswers > page * pageSize;

    return { answers, hasNext };
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

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpVoted ? -1 : 1 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasUpVoted ? -10 : 10 },
    });

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

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownVoted ? -1 : 1 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownVoted ? 10 : -10 },
    });

    revalidatePath(path);
  });
};

export const deleteAnswer = async (answerId: string, path: string) => {
  return await runWithDatabase(async () => {
    await Answer.deleteOne({ _id: answerId });
    await Question.updateOne(
      { answers: answerId },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  });
};
