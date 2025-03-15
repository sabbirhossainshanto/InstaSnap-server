import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.route";
import { userRoutes } from "../modules/User/user.route";
import { followRoutes } from "../modules/Follow/follow.route";
import { profileRoutes } from "../modules/Profile/profile.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/follow", route: followRoutes },
  { path: "/profile", route: profileRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
