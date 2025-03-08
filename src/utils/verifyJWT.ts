import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import { Types } from "mongoose";
import type { USER_ROLE, USER_STATUS } from "../app/modules/User/user.constant";
import AppError from "../app/errors/AppError";

export const createToken = (
  jwtPayload: {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    mobileNumber?: string;
    role: keyof typeof USER_ROLE;
    status: keyof typeof USER_STATUS;
  },
  secret: string,
  expiresIn: any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, "You are not authorized!");
  }
};
