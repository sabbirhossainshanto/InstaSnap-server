import type { TUser } from "../User/user.interface";
import type { TFollow } from "./follow.interface";
import { Follow } from "./follow.model";

const followUnfollowUser = async (payload: TFollow, user: TUser) => {
  const isAlreadyFollowing = await Follow.findOne({
    followerUser: user?._id,
    followingUser: payload.followingUser,
  });

  if (isAlreadyFollowing) {
    const result = await Follow.deleteOne({
      followerUser: isAlreadyFollowing.followerUser,
      followingUser: isAlreadyFollowing.followingUser,
    });
    return {
      data: result,
      message: "unfollow user successful",
    };
  }
  payload.followerUser = user?._id;
  const result = await Follow.create(payload);
  return {
    data: result,
    message: "follow user successful",
  };
};

// const getFollowAndFollower = async (query:Record<string,string>,user: TUser) => {
//   const followerUser = await Follow.find({
//     followerUser: user?._id,
//   });

//   if()

// };

export const followService = {
  followUnfollowUser,
};
