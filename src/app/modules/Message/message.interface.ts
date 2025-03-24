import { Types } from "mongoose";

export type TMessage = {
  _id: Types.ObjectId;
  senderUser: Types.ObjectId;
  receiverUser: Types.ObjectId;
  text: string;
  image: string;
};
