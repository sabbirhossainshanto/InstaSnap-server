import AppError from "../../errors/AppError";
import { Post } from "../Post/post.model";
import type { TUser } from "../User/user.interface";
import type { TComment } from "./comment.interface";
import { Comment } from "./comment.model";
import httpStatus from "http-status";

const addCommentToPost = async (user: TUser, payload: TComment) => {
  const post = await Post.findById(payload.post);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  payload.commentUser = user?._id;
  const result = await Comment.create(payload);
  return result;
};

export const commentService = {
  addCommentToPost,
};
