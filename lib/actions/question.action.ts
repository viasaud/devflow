"use server";

import { revalidatePath } from "next/cache";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";

import { createQuestionParams, getQuestionByIdParams, getQuestionsParams, questionVoteParams } from "./shared.types";

export const createQuestion = async (params: createQuestionParams) => {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

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

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async (params: getQuestionsParams) => {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
        options: { sort: { name: 1 } },
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return questions;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionById = async (params: getQuestionByIdParams) => {
  try {
    connectToDatabase();

    const { questionId } = params;

    return await Question.findById(questionId)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });
  } catch (error) {
    console.log(error);
  }
};

export const upVoteQuestion = async (params: questionVoteParams) => {
  try {
    connectToDatabase();

    const { questionId, userId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = {};
    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId }, $push: { upVotes: userId } };
    } else {
      updateQuery = { $addToSet: { upVotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if (!question) throw new Error("Question not found");

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const downVoteQuestion = async (params: questionVoteParams) => {
  try {
    connectToDatabase();

    const { questionId, userId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = {};
    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId }, $push: { downVotes: userId } };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    if (!question) throw new Error("Question not found");

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};
