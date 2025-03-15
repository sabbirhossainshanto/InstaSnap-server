import { Types } from "mongoose";

export type TPost = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  media: string[];
  caption: string;
  likes: Types.ObjectId[];
};
