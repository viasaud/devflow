import { Schema } from "mongoose";
import { IUser } from "@/database/user.model";

export interface getQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface createQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface createAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}

export interface getAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface answerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface deleteAnswerParams {
  answerId: string;
  path: string;
}

export interface searchParams {
  query?: string | null;
  type?: string | null;
}

export interface recommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface viewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface jobFilterParams {
  query: string;
  page: string;
}

export interface getQuestionByIdParams {
  questionId: string;
}

export interface questionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface deleteQuestionParams {
  questionId: string;
  path: string;
}

export interface editQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export interface getAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface getQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface getTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface createUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface getUserByIdParams {
  userId: string;
}

export interface getAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface updateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface toggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface getSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface getUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface deleteUserParams {
  clerkId: string;
}