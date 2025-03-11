import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { USER_ROLE } from "../User/user.constant";
import { User } from "../User/user.model";
import { Types } from "mongoose";
import { createToken } from "../../../utils/verifyJWT";
import type { TLoginUser } from "./auth.interface";
import { sendEmail } from "../../../utils/sendEmail";
import type { TUser } from "../User/user.interface";

const registerUser = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });

  if (user?.email) {
    throw new AppError(httpStatus.NOT_FOUND, "This email is already used!");
  }
  if (user?.userName) {
    throw new AppError(httpStatus.NOT_FOUND, "This user name is already used!");
  }

  payload.role = USER_ROLE.USER;

  //create new user
  const newUser = await User.create(payload);

  const jwtPayload = {
    _id: newUser._id as Types.ObjectId,
    fullName: newUser.fullName,
    userName: newUser.userName,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status,
    isVerified: newUser?.isVerified,
    createdAt: newUser?.createdAt,
    updatedAt: newUser?.updatedAt,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  const userStatus = user?.status;

  if (userStatus === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }
  console.log(user);
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new Error("Password incorrect!");
  }

  const jwtPayload = {
    _id: user._id as Types.ObjectId,
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    role: user.role,
    status: user.status,
    isVerified: user?.isVerified,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.findOne(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  const userStatus = user?.status;

  if (userStatus === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new Error("Password incorrect!");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.findOne(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  const jwtPayload = {
    _id: user._id as Types.ObjectId,
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    role: user.role,
    status: user.status,
    isVerified: user?.isVerified,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  const userData = {
    _id: user._id,
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    mobileNumber: user.mobileNumber,
    profilePhoto: user.profilePhoto,
    role: user.role,
    status: user.status,
    isVerified: user?.isVerified,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
  };

  const accessToken = createToken(
    userData,
    config.jwt_access_secret as string,
    "10m"
  );
  const generatedLink = `${config.client_base_url}/reset-password?email=${user.email}&token=${accessToken}`;
  await sendEmail(user.email, generatedLink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string
) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (decoded?.email !== payload.email) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  await User.findOneAndUpdate(
    {
      email: decoded?.email,
    },
    {
      password: hashedPassword,
    }
  );
};
export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
