import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = Router();

router.post(
  "/add-comment",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(commentValidation.createComment),
  commentController.addCommentToPost
);

export const commentRoutes = router;
