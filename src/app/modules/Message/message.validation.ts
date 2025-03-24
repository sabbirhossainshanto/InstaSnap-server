import { z } from "zod";

const createMessage = z.object({
  body: z.object({
    receiverUser: z.string({
      required_error: "receiverUser id is required",
    }),
    text: z
      .string({
        required_error: "text is required",
      })
      .optional(),
  }),
});

export const messageValidation = {
  createMessage,
};
