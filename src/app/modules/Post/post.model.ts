import { Schema, model } from "mongoose";
import type { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
  {
    caption: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    media: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
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
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});
export const Post = model<TPost>("Post", postSchema);
