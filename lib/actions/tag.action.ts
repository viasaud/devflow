import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";

import {
  getAllTagsParams,
  getQuestionsByTagNameParams,
  getTopInteractedTagsParams,
} from "./shared.types";

export const getTopInteractedTags = async (
  params: getTopInteractedTagsParams,
) => {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // find all tags that user has interacted with
    return [{ name: "JavaScript" }, { name: "HTML" }];
  } catch (error) {
    console.log(error);
  }
};

export const getTags = async (params: getAllTagsParams) => {
  try {
    connectToDatabase();
    return await Tag.find().sort({ name: 1 });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsByTagName = async (
  params: getQuestionsByTagNameParams,
) => {
  try {
    connectToDatabase();
    const { name, searchQuery } = params;
    const tag = await Tag.findOne({ name })
      .populate({
        path: "questions",
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: "i" } }
          : {},
        options: {
          sort: { createdAt: -1 },
        },
        populate: [
          {
            path: "tags",
            model: Tag,
            options: { sort: { name: 1 } },
          },
          { path: "author", model: User },
        ],
      })
      .sort({ createdAt: -1 });

    const questions = tag.questions;

    return { questions };
  } catch (error) {
    console.log(error);
  }
};
