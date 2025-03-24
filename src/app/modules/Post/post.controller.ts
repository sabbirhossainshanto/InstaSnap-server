import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { postService } from "./post.service";
import httpStatus from "http-status";

const createPost = catchAsync(async (req, res) => {
  const result = await postService.createPostInToDB(
    req.user,
    req.files as Express.Multer.File[],
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post uploaded Successfully",
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await postService.getAllPost(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts are retrieved Successfully",
    data: result,
  });
});
const getSinglePost = catchAsync(async (req, res) => {
  const result = await postService.getSinglePost(req.params.postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post is retrieve Successfully",
    data: result,
  });
});
const addLikeToPost = catchAsync(async (req, res) => {
  const { message, result } = await postService.addLikeToPost(
    req.body,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message,
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
  addLikeToPost,
  getSinglePost,
};
