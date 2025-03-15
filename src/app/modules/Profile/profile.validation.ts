import { z } from "zod";

const updateUserProfile = z.object({
  body: z.object({
    gender: z.string({
      required_error: "Name is required",
    }),
    website: z.string({
      required_error: "Website is required",
    }),
    bio: z.string({
      required_error: "Bio is required",
    }),
  }),
});

const profileValidation = {
  updateUserProfile,
};
