import { z } from "zod";

const createComment = z.object({
  body: z.object({
    post: z.string({
      required_error: "post id is required",
    }),
    text: z.string({
      required_error: "text is required",
    }),
  }),
});

export const commentValidation = {
  createComment,
};
