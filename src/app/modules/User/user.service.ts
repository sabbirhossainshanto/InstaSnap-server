import { User } from "./user.model";
import type { TUser } from "./user.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllUsersFromDB = async (
  query: Record<string, unknown>,
  user: TUser
) => {
  const userQuery = new QueryBuilder(
    User.find({ _id: { $ne: user?._id } })
      .populate({
        path: "followers",
        populate: {
          path: "followerUser",
        },
      })
      .populate({
        path: "followings",
        populate: {
          path: "followingUser",
        },
      })
      .lean(),
    query
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (user: string) => {
  const result = await User.findOne({ userName: user })
    .populate({
      path: "followers",
      populate: {
        path: "followerUser",
      },
    })
    .populate({
      path: "followings",
      populate: {
        path: "followingUser",
      },
    });

  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
};
