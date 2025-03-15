import { fileUploader } from "../../../utils/fileUploader";
import type { TUser } from "../User/user.interface";
import type { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostInToDB = async (
  user: TUser,
  files: Express.Multer.File[],
  payload: TPost
) => {
  console.log(files);
  if (files) {
    const photos = await fileUploader.uploadMultipleToCloudinary(files);
    payload.media = photos;
  }
  payload.user = user._id;

  const result = await Post.create(payload);
  return result;
};

const getAllPost = async () => {
  const result = await Post.find().populate("user");
  return result;
};

export const postService = {
  createPostInToDB,
  getAllPost,
};
