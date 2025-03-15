import { fileUploader } from "../../../utils/fileUploader";
import type { TUser } from "../User/user.interface";
import { User } from "../User/user.model";

const updateProfile = async (
  user: TUser,
  file: Express.Multer.File,
  payload: TUser
) => {
  if (file) {
    const { secure_url } = await fileUploader.uploadToCloudinary(file);
    payload.profilePhoto = secure_url;
  }
  const result = await User.findByIdAndUpdate(user._id, payload, { new: true });
  return result;
};

export const profileService = {
  updateProfile,
};
