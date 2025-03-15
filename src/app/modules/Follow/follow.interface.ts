import type { Types } from "mongoose";

export type TFollow = {
  _id: Types.ObjectId;
  followingUser: Types.ObjectId;
  followerUser: Types.ObjectId;
};
