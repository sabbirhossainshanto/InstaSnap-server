import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";
import AppError from "../app/errors/AppError";
import type { TUser } from "../app/modules/User/user.interface";

export const createToken = (
  jwtPayload: Partial<TUser>,
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
