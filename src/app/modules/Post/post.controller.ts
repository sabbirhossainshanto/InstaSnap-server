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
  const result = await postService.getAllPost();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts are Successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
};
