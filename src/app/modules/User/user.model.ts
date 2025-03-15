import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";
import config from "../../config";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import type { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true,
    },
    email: {
      type: String,
      required: true,
      //validate email
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
    mobileNumber: {
      type: String,
      default: null,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this; // doc
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.virtual("followers", {
  ref: "Follow",
  localField: "_id", // The current user's ID
  foreignField: "followingUser", // Users who are following this user
  justOne: false, // Multiple followers
});

userSchema.virtual("followings", {
  ref: "Follow",
  localField: "_id", // The current user's ID
  foreignField: "followerUser", // Users this user is following
  justOne: false, // Multiple followings
});

export const User = model<TUser>("User", userSchema);
