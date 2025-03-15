import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { followService } from "./follow.service";

const followUnfollowUser = catchAsync(async (req, res) => {
  const { data, message } = await followService.followUnfollowUser(
    req.body,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message,
    data,
  });
});

export const followController = {
  followUnfollowUser,
};
