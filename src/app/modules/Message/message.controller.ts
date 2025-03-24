import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { messageService } from "./message.service";

const sendMessage = catchAsync(async (req, res) => {
  const result = await messageService.sendMessage(
    req.user,
    req.file as Express.Multer.File,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Message sended successfully",
    data: result,
  });
});
const getMessages = catchAsync(async (req, res) => {
  const result = await messageService.getMessages(req.user, req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Messages received successfully",
    data: result,
  });
});

export const messageController = {
  sendMessage,
  getMessages,
};
