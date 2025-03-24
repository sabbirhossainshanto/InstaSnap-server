import { fileUploader } from "../../../utils/fileUploader";
import { Follow } from "../Follow/follow.model";
import type { TUser } from "../User/user.interface";
import type { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostInToDB = async (
  user: TUser,
  files: Express.Multer.File[],
  payload: TPost
) => {
  if (files) {
    const photos = await fileUploader.uploadMultipleToCloudinary(files);
    payload.media = photos;
  }
  payload.user = user._id;

  const result = await Post.create(payload);
  return result;
};

const getAllPost = async (user: TUser) => {
  // Step 1: Get all followingUser IDs for the current user
  const following = await Follow.find({ followerUser: user?._id }).select(
    "followingUser"
  );

  const followingUserIds = following.map((f) => f.followingUser);

  // Step 2: Find posts where post.user is in the list of followingUserIds
  const posts = await Post.find({ user: { $in: followingUserIds } })
    .populate("user")
    .populate("likes")
    .populate({
      path: "comments",
      populate: {
        path: "commentUser",
      },
    })
    .sort({ createdAt: -1 }); // Optional: sort newest first

  return posts;
};

const getSinglePost = async (id: string) => {
  const result = await Post.findById(id)
    .populate("user")
    .populate("likes")
    .populate({
      path: "comments",
      populate: {
        path: "commentUser",
      },
    });
  return result;
};

const addLikeToPost = async (payload: { postId: string }, user: TUser) => {
  const isAlreadyLiked = await Post.findOne({
    likes: user?._id,
    _id: payload.postId,
  });
  if (isAlreadyLiked) {
    const result = await Post.findByIdAndUpdate(payload.postId, {
      $pull: { likes: user?._id },
    });
    return {
      result,
      message: "Liked removed successfully",
    };
  }
  const result = await Post.findByIdAndUpdate(payload.postId, {
    $push: { likes: user?._id },
  });
  return {
    result,
    message: "Liked added successfully",
  };
};

export const postService = {
  createPostInToDB,
  getAllPost,
  addLikeToPost,
  getSinglePost,
};
