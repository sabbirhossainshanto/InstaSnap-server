import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { followController } from "./follow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { followValidation } from "./follow.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(followValidation.followUnfollow),
  followController.followUnfollowUser
);

export const followRoutes = router;
