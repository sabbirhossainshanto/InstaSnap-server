import { z } from "zod";

const createPost = z.object({
  body: z.object({
    caption: z.string({
      required_error: "Caption is required",
    }),
  }),
});

export const postValidation = {
  createPost,
};
