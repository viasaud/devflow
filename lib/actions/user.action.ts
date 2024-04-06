"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";

import {
  createUserParams,
  deleteUserParams,
  getAllUsersParams,
  getSavedQuestionsParams,
  getUserByIdParams,
  toggleSaveQuestionParams,
  updateUserParams,
} from "./shared.types";

export const getUserById = async (params: getUserByIdParams) => {
  try {
    connectToDatabase();
    const { userId } = params;
    return await User.findOne({ clerkId: userId });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (params: createUserParams) => {
  try {
    connectToDatabase();
    return await User.create(params);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: updateUserParams) => {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (params: deleteUserParams) => {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) throw new Error("User not found");
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct("_id");
    await Question.deleteMany({ author: user._id });
    return await User.findByIdAndDelete(user._id);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (params: getAllUsersParams) => {
  try {
    connectToDatabase();
    // const { page = 1, pageSize = 20 } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error);
  }
};

export const toggleSaveQuestion = async (params: toggleSaveQuestionParams) => {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
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
  } catch (error) {
    console.log(error);
  }
};

export const getSavedQuestions = async (params: getSavedQuestionsParams) => {
  try {
    connectToDatabase();
    const { mongoUser, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ mongoUser }).populate({
      path: "savedQuestions",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "author", model: "User" },
        { path: "tags", model: "Tag" },
      ],
    });
    if (!user) throw new Error("User not found");

    return { savedQuestions: user.savedQuestions };
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async ({ username }: { username: string }) => {
  try {
    connectToDatabase();

    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found in getUserInfo()");

    const totalQuestions = await Question.countDocuments({
      author: user._id,
    });

    const totalAnswers = await Answer.countDocuments({
      author: user._id,
    });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
  }
};
