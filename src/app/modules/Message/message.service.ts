import AppError from "../../errors/AppError";
import type { TUser } from "../User/user.interface";
import httpStatus from "http-status";
import { Message } from "./message.model";
import type { TMessage } from "./message.interface";
import { fileUploader } from "../../../utils/fileUploader";
import { getReceiverSocketId, io } from "../../../utils/socket";

const sendMessage = async (
  user: TUser,
  file: Express.Multer.File,
  payload: TMessage
) => {
  if (!payload?.text && !payload?.image) {
    throw new AppError(httpStatus.BAD_REQUEST, "Text or image required");
  }
  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.image = secure_url;
  }
  payload.senderUser = user?._id;

  const result = await Message.create(payload);
  const receiverSocketId = getReceiverSocketId(payload.receiverUser);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", result);
  }
  return result;
};

const getMessages = async (user: TUser, receiverId: string) => {
  const result = await Message.find({
    $or: [
      {
        senderUser: user?._id,
        receiverUser: receiverId,
      },
      {
        senderUser: receiverId,
        receiverUser: user?._id,
      },
    ],
  })
    .populate("senderUser")
    .populate("receiverUser");
  return result;
};

export const messageService = {
  sendMessage,
  getMessages,
};
