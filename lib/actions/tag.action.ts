import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { runWithDatabase } from "../mongoose";

import { getAllTagsParams, getQuestionsByTagNameParams } from "./shared.types";

export const getPopularTags = async ({ limit = 5 }: { limit?: number }) => {
  return await runWithDatabase(async () => {
    return await Tag.find().sort({ questions: 1 }).limit(limit);
  });
};

export const getTags = async (params: getAllTagsParams) => {
  const { filter } = params;
  let sortQuery = {};
  switch (filter) {
    case "popular":
      sortQuery = { questions: -1 };
      break;
    case "name":
      sortQuery = { name: 1 };
      break;
    case "latest":
      sortQuery = { createdAt: -1 };
      break;
    case "oldest":
      sortQuery = { createdAt: 1 };
      break;
    default:
      sortQuery = { questions: -1 };
      break;
  }
  return await runWithDatabase(async () => {
    return await Tag.find().sort(sortQuery);
  });
};

export const getQuestionsByTagName = async (
  params: getQuestionsByTagNameParams
) => {
  const { name, searchQuery } = params;
  return await runWithDatabase(async () => {
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

    return questions;
  });
};
