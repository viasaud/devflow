"use server";

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
    const user = await User.findOne({ clerkId });

    const params = new URLSearchParams();

    params.set("height", "32");
    params.set("width", "32");
    params.set("fit", "crop");
    params.set("quality", "50");

    user.avatar = `${user.avatar}?${params.toString()}`;

    return user;
  });
};

export const getUsers = async (params: getAllUsersParams) => {
  const { filter, page = 1, pageSize = 40 } = params;

  const skip = (page - 1) * pageSize;

  let sortOptions = {};
  if (filter === "latest") {
    sortOptions = { joinedAt: -1 };
  } else if (filter === "oldest") {
    sortOptions = { joinedAt: 1 };
  } else {
    sortOptions = { reputation: -1 };
  }

  return await runWithDatabase(async () => {
    const users = await User.find()
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const params = new URLSearchParams();

    params.set("height", "112");
    params.set("width", "112");
    params.set("fit", "crop");
    params.set("quality", "90");

    users.forEach((user) => {
      user.avatar = `${user.avatar}?${params.toString()}`;
    });

    const totalUsers = await User.countDocuments();
    const hasNext = totalUsers > page * pageSize;
    return { users, hasNext };
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
  const { filter, clerkId, page = 1, pageSize = 20 } = params;

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
    const user = await User.findOne({ clerkId }).populate({
      path: "savedQuestions",
      match: searchFilter,
      options: {
        skip,
        limit: pageSize,
        sort: sortOptions,
      },
      populate: [
        { path: "author", model: "User" },
        { path: "tags", model: "Tag" },
      ],
    });

    if (!user) throw new Error("User not found");

    const totalQuestions = await User.findOne({ clerkId }).then((user) => {
      return user?.savedQuestions.length;
    });
    const hasNext = totalQuestions > page * pageSize;

    return { savedQuestions: user.savedQuestions, hasNext };
  });
};

export const getUserData = async ({ username }: { username: string }) => {
  return await runWithDatabase(async () => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found in getUserData()");

    const params = new URLSearchParams();

    params.set("height", "128");
    params.set("width", "128");
    params.set("fit", "crop");
    params.set("quality", "90");

    user.avatar = `${user.avatar}?${params.toString()}`;

    const totalQuestions = await Question.countDocuments({
      author: user._id,
    });

    const totalAnswers = await Answer.countDocuments({
      author: user._id,
    });

    return { user, totalQuestions, totalAnswers };
  });
};

export const getUserQuestions = async ({
  username,
  page = 1,
  pageSize = 20,
}: {
  username: string;
  page?: number;
  pageSize?: number;
}) => {
  const skip = (page - 1) * pageSize;
  return await runWithDatabase(async () => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found in getUserInfo()");

    const questions = await Question.find({
      author: user._id,
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate({
        path: "tags",
        model: Tag,
        options: { sort: { name: 1 } },
      })
      .populate({ path: "author", model: User });

    const totalQuestions = await Question.countDocuments({
      author: user._id,
    });
    const hasNext = totalQuestions > page * pageSize;

    return { questions, hasNext };
  });
};

export const getUserAnswers = async ({
  username,
  page = 1,
  pageSize = 20,
}: {
  username: string;
  page?: number;
  pageSize?: number;
}) => {
  const skip = (page - 1) * pageSize;
  return await runWithDatabase(async () => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found in getUserInfo()");

    const answers = await Answer.find({
      author: user._id,
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate({
        path: "question",
        model: Question,
        populate: [
          { path: "tags", model: Tag },
          { path: "author", model: User },
        ],
      });

    const totalAnswers = await Answer.countDocuments({
      author: user._id,
    });
    const hasNext = totalAnswers > page * pageSize;

    return { answers, hasNext };
  });
};
