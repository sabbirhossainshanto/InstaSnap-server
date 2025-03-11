import { Types } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export type TUser = {
  _id: Types.ObjectId;
  fullName: string;
  userName: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  bio?: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
