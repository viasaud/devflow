// import Tag from "@/database/tag.model";

import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { connectToDatabase } from "../mongoose";

import { getAllTagsParams, getTopInteractedTagsParams } from "./shared.types";

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
    return await Tag.find();
  } catch (error) {
    console.log(error);
  }
};
