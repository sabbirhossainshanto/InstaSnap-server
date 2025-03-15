import { Schema, model } from "mongoose";
import type { TFollow } from "./follow.interface";

const followSchema = new Schema<TFollow>(
  {
    followerUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followingUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Follow = model<TFollow>("Follow", followSchema);
