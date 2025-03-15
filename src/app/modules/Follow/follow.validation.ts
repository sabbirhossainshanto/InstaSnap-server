import { z } from "zod";

const followUnfollow = z.object({
  body: z.object({
    followingUser: z.string({
      required_error: "followingUser is required",
    }),
  }),
});

export const followValidation = {
  followUnfollow,
};
