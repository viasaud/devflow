"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

import { runWithDatabase } from "../mongoose";

import { searchParams } from "./shared.types";

export async function Search(params: searchParams) {
  const { query, type } = params;
  const typeLowered = type?.toLowerCase();
  const regexQuery = { $regex: query, $options: "i" };

  let result: any = [];

  const types = [
    {
      model: Question,
      type: "question",
      searchField: "title",
    },
    {
      model: User,
      type: "user",
      searchField: "name",
    },
    {
      model: Tag,
      type: "tag",
      searchField: "name",
    },
  ];

  return await runWithDatabase(async () => {
    if (
      !typeLowered ||
      (typeLowered !== "question" &&
        typeLowered !== "user" &&
        typeLowered !== "tag")
    ) {
      for (const { model, type, searchField } of types) {
        const searchFields = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        result.push(
          ...searchFields.map((field: any) => ({
            title: field[searchField],
            type,
            name:
              type === "user"
                ? field.username
                : type === "tag"
                  ? field.name
                  : field[searchField],
            id: type === "user" ? field.clerkId : field._id,
          }))
        );
      }

      return JSON.stringify(result);
    } else {
      const model = types.find((t) => t.type === typeLowered);
      if (!model) {
        throw new Error("Model not found");
      }

      const searchFields = await model.model
        .find({ [model.searchField]: regexQuery })
        .limit(8);

      result = searchFields.map((field: any) => ({
        title: field[model.searchField],
        type,
        name:
          typeLowered === "user"
            ? field.username
            : typeLowered === "tag"
              ? field.name
              : field[model.searchField],
        id: typeLowered === "user" ? field.clerkId : field._id,
      }));

      return JSON.stringify(result);
    }
  });
}
