import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { profileService } from "./profile.service";
import httpStatus from "http-status";

const updateProfile = catchAsync(async (req, res) => {
  const result = await profileService.updateProfile(
    req.user,
    req.file as Express.Multer.File,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated Successfully",
    data: result,
  });
});

export const profileController = {
  updateProfile,
};
