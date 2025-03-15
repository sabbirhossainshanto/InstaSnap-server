import express from "express";
import { UserControllers } from "./user.controller";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

export const userRoutes = router;

router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getAllUsers
);

router.get("/:user", UserControllers.getSingleUser);
