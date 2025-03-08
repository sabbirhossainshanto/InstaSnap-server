import type { JwtPayload } from "jsonwebtoken";

import { UserSearchableFields } from "./user.constant";

import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import type { TUser } from "./user.interface";
import { QueryBuilder } from "../../builder/QueryBuilder";

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  const users = new QueryBuilder(
    User.find({ _id: { $ne: user?._id } })
      .populate("followers")
      .populate("following")
      .populate("posts")
      .populate("favorites"),
    query
  )
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
