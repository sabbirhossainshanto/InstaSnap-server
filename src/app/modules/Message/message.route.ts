import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { messageValidation } from "./message.validation";
import { messageController } from "./message.controller";
import { fileUploader } from "../../../utils/fileUploader";
import parseRequest from "../../middlewares/parseRequest";

const router = Router();

router.post(
  "/send-message",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  fileUploader.upload.single("file"),
  parseRequest,
  validateRequest(messageValidation.createMessage),
  messageController.sendMessage
);
router.get(
  "/:id",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  messageController.getMessages
);

export const messageRoutes = router;
