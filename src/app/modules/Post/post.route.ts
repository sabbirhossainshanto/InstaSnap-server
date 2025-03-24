import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { fileUploader } from "../../../utils/fileUploader";
import parseRequest from "../../middlewares/parseRequest";
import validateRequest from "../../middlewares/validateRequest";
import { postValidation } from "./post.validation";
import { postController } from "./post.controller";

const router = Router();

router.post(
  "/create-post",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  fileUploader.uploadMultiple,
  parseRequest,
  validateRequest(postValidation.createPost),
  postController.createPost
);

router.get(
  "/",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  postController.getAllPost
);
router.get(
  "/:postId",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  postController.getSinglePost
);
router.put(
  "/like",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  postController.addLikeToPost
);

export const postRoutes = router;
