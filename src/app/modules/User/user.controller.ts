import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const getAllUsers = catchAsync(async (req, res) => {
  const { meta, result } = await UserServices.getAllUsersFromDB(
    req.query,
    req.user
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users Retrieved Successfully",
    data: result,
    meta,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrieved Successfully",
    data: user,
  });
});

export const UserControllers = {
  getSingleUser,
  getAllUsers,
};
