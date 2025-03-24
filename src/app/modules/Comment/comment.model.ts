import { Schema, model } from "mongoose";
import type { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    replies: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
        },
      },
    ],

    commentUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
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

export const Comment = model<TComment>("Comment", commentSchema);
