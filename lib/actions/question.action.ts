"use server";

import { revalidatePath } from "next/cache";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { runWithDatabase } from "../mongoose";

import {
  createQuestionParams,
  editQuestionParams,
  getQuestionByIdParams,
  getQuestionsParams,
  questionVoteParams,
} from "./shared.types";

export const createQuestion = async (params: createQuestionParams) => {
  const { title, content, tags, author, path } = params;
  return await runWithDatabase(async () => {
    const lowerCaseTags = tags.map((tag) => tag.toLowerCase().replace("#", ""));

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocs = [];

    for (const tag of lowerCaseTags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocs.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocs } },
    });

    await Interaction.create({
      user: author,
      question: question._id,
      action: "ask",
      tags: tagDocs,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  });
};

export const getQuestions = async (params: getQuestionsParams) => {
  const { filter, page = 1, pageSize = 20 } = params;

  const skip = (page - 1) * pageSize;

  let sortOptions = {};
  let searchFilter = {};
  if (filter === "popular") {
    sortOptions = { upVotes: -1 };
  } else if (filter === "hot") {
    sortOptions = { views: -1, upVotes: -1 };
    searchFilter = {
      createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
    };
  } else if (filter === "open") {
    searchFilter = { answers: { $size: 0 } };
  } else {
    sortOptions = { createdAt: -1 };
  }

  return await runWithDatabase(async () => {
    const questions = await Question.find(searchFilter)
      .sort(sortOptions)
      .populate({
        path: "tags",
        model: Tag,
        options: { sort: { name: 1 } },
      })
      .populate({ path: "author", model: User })
      .skip(skip)
      .limit(pageSize);

    const totalQuestions = await Question.countDocuments(searchFilter);
    const hasNext = totalQuestions > page * pageSize;

    return { questions, hasNext };
  });
};

export const getQuestionById = async (params: getQuestionByIdParams) => {
  const { questionId } = params;
  return await runWithDatabase(async () => {
    return await Question.findById(questionId)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });
  });
};

export const upVoteQuestion = async (params: questionVoteParams) => {
  const { questionId, userId, hasUpVoted, hasDownVoted, path } = params;
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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) throw new Error("Question not found");

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasUpVoted ? -10 : 10 },
    });

    revalidatePath(path);
  });
};

export const downVoteQuestion = async (params: questionVoteParams) => {
  const { questionId, userId, hasUpVoted, hasDownVoted, path } = params;
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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) throw new Error("Question not found");

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasDownVoted ? 10 : -10 },
    });
    revalidatePath(path);
  });
};

export const deleteQuestion = async (questionId: string, path: string) => {
  return await runWithDatabase(async () => {
    await Question.deleteOne({ _id: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Answer.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    await Tag.deleteMany({ questions: { $size: 0 } });

    revalidatePath(path);
  });
};
export const editQuestion = async (params: editQuestionParams) => {
  const { title, content, questionId, path } = params;
  return await runWithDatabase(async () => {
    await Question.findByIdAndUpdate(questionId, { title, content });
    revalidatePath(path);
  });
};

export const getPopularQuestions = async () => {
  return await runWithDatabase(async () => {
    return await Question.aggregate([
      { $addFields: { upVotesCount: { $size: "$upVotes" } } },
      { $sort: { upVotesCount: -1 } },
      { $limit: 5 },
    ]);
  });
};
