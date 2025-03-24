import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.route";
import { userRoutes } from "../modules/User/user.route";
import { followRoutes } from "../modules/Follow/follow.route";
import { profileRoutes } from "../modules/Profile/profile.route";
import { postRoutes } from "../modules/Post/post.route";
import { commentRoutes } from "../modules/Comment/comment.route";
import { messageRoutes } from "../modules/Message/message.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/follow", route: followRoutes },
  { path: "/profile", route: profileRoutes },
  { path: "/posts", route: postRoutes },
  { path: "/comments", route: commentRoutes },
  { path: "/messages", route: messageRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
