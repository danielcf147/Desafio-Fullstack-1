import { Router } from "express";
import {
  createUserController,
  loginUserController,
  listUserInfoController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controllers";
import dataIsValid from "../middlewares/dataIsValid.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";
import isSameUserMiddleware from "../middlewares/ensureIsSameUser.middleware";
import { userRequestSerializer } from "../serializers/user/user.serializer";
import userLoginSerializer from "../serializers/user/userLogin.serializer";

const userRouters = Router();

userRouters.post("", dataIsValid(userRequestSerializer), createUserController);
userRouters.post(
  "/login",
  dataIsValid(userLoginSerializer),
  loginUserController
);

userRouters.get("", ensureAuthMiddleware, listUserInfoController);
userRouters.patch(
  "/:id",
  ensureAuthMiddleware,
  isSameUserMiddleware,
  updateUserController
);
userRouters.delete(
  "/:id",
  ensureAuthMiddleware,
  isSameUserMiddleware,
  deleteUserController
);

export default userRouters;
