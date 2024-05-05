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
  const { filter, page = 1, pageSize = 100 } = params;

  const skip = (page - 1) * pageSize;

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
    const tags = await Tag.find().skip(skip).limit(pageSize).sort(sortQuery);

    const totalTags = await Tag.countDocuments();
    const hasNext = totalTags > page * pageSize;

    return { tags, hasNext };
  });
};

export const getQuestionsByTagName = async (
  params: getQuestionsByTagNameParams
) => {
  const { name, filter, searchQuery, page = 1, pageSize = 20 } = params;

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
    const tag = await Tag.findOne({ name })
      .populate({
        path: "questions",
        model: Question,
        match: {
          ...searchFilter,
          ...(searchQuery
            ? { title: { $regex: searchQuery, $options: "i" } }
            : {}),
        },
        options: {
          sort: sortOptions,
          skip,
          limit: pageSize,
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

    const totalQuesations = await Question.countDocuments({
      tags: tag._id,
      ...searchFilter,
    });
    const hasNext = totalQuesations > page * pageSize;

    return { questions, hasNext };
  });
};
