"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { runWithDatabase } from "../mongoose";

import {
  createUserParams,
  getAllUsersParams,
  getSavedQuestionsParams,
  toggleSaveQuestionParams,
  updateUserParams,
} from "./shared.types";

export const createUser = async (params: createUserParams) => {
  return await runWithDatabase(async () => {
    return await User.create(params);
  });
};

export const updateUser = async (params: updateUserParams) => {
  const { clerkId, updateData, path } = params;
  return await runWithDatabase(async () => {
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  });
};

export const deleteUser = async ({ clerkId }: { clerkId: string }) => {
  return await runWithDatabase(async () => {
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error(`User not found for clerkId: ${clerkId}`);

    const questionIds = await Question.distinct("_id", { author: user._id });

    await Tag.updateMany(
      { questions: { $in: questionIds } },
      { $pull: { questions: { $in: questionIds } } }
    );

    await Tag.deleteMany({ questions: { $size: 0 } });

    await Question.deleteMany({ author: user._id });
    await Answer.deleteMany({ questionId: { $in: questionIds } });
    await Answer.deleteMany({ author: user._id });
    await Interaction.deleteMany({ questionId: { $in: questionIds } });

    await User.findByIdAndDelete(user._id);
  });
};

export const getUserById = async ({ clerkId }: { clerkId: string }) => {
  return await runWithDatabase(async () => {
    return await User.findOne({ clerkId });
  });
};

export const getUsers = async (params: getAllUsersParams) => {
  return await runWithDatabase(async () => {
    return await User.find().sort({ createdAt: -1 });
  });
};

export const toggleSaveQuestion = async (params: toggleSaveQuestionParams) => {
  const { userId, questionId, path } = params;
  return await runWithDatabase(async () => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const hasSaved = user.savedQuestions.includes(questionId);

    if (hasSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { savedQuestions: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { savedQuestions: questionId },
        },
        { new: true }
      );
    }
    revalidatePath(path);
  });
};

export const getSavedQuestions = async (params: getSavedQuestionsParams) => {
  return await runWithDatabase(async () => {
    const { mongoUser, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ mongoUser }).populate({
      path: "savedQuestions",
      match: query,
      options: {
        sort: { views: -1, upVotes: -1 },
      },
      populate: [
        { path: "author", model: "User" },
        { path: "tags", model: "Tag" },
      ],
    });
    if (!user) throw new Error("User not found");

    return user.savedQuestions;
  });
};

export const getUserInfo = async ({ username }: { username: string }) => {
  return await runWithDatabase(async () => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found in getUserInfo()");

    const totalQuestions = await Question.countDocuments({
      author: user._id,
    });

    const totalAnswers = await Answer.countDocuments({
      author: user._id,
    });

    return { user, totalQuestions, totalAnswers };
  });
};

export const getUserQuestions = async ({ username }: { username: string }) => {
  return await runWithDatabase(async () => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found in getUserInfo()");

    const questions = await Question.find({
      author: user._id,
    })
      .sort({ views: -1, upVotes: -1 })
      .populate({
        path: "tags",
        model: Tag,
        options: { sort: { name: 1 } },
      })
      .populate({ path: "author", model: User });

    return questions;
  });
};
