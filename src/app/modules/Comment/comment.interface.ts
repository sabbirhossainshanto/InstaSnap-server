import { Types } from "mongoose";

export type TComment = {
  _id: Types.ObjectId;
  post: Types.ObjectId;
  commentUser: Types.ObjectId;
  text: string;
  replies: {
    user: Types.ObjectId;
    text: string;
  }[];
};
