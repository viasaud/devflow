"use server";

import { revalidatePath } from "next/cache";

import Question from "@/database/question.model";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";

import { createUserParams, deleteUserParams, getUserByIdParams, updateUserParams } from "./shared.types";

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
