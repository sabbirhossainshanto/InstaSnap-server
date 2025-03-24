import { Schema, model } from "mongoose";
import type { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
  {
    senderUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Message = model<TMessage>("Message", messageSchema);
