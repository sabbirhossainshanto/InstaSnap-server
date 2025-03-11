import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: "Name is required",
    }),
    userName: z.string({
      required_error: "User name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email",
      }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    status: z.nativeEnum(USER_STATUS).optional(),
    mobileNumber: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
