import { Router } from "express";
import { profileController } from "./profile.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { fileUploader } from "../../../utils/fileUploader";
import parseRequest from "../../middlewares/parseRequest";

const router = Router();

router.put(
  "/",
  fileUploader.upload.single("file"),
  parseRequest,
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  profileController.updateProfile
);

export const profileRoutes = router;
