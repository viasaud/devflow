"use server";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export const createQuestion = async (params: any) => {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocs = [];

    for (const tag of tags) {
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
  } catch (error) {
    console.log(error);
  }
};
