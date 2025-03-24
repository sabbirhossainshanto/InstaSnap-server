import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { commentService } from "./comment.service";

const addCommentToPost = catchAsync(async (req, res) => {
  const result = await commentService.addCommentToPost(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment added successfully",
    data: result,
  });
});

export const commentController = {
  addCommentToPost,
};
