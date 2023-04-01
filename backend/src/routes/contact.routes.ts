import { Router } from "express";
import {
  createUserContactController,
  listUserController,
  deleteUserContactController,
} from "../controllers/userContact.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";
import isSameUserMiddleware from "../middlewares/ensureIsSameUser.middleware";

const contactRouters = Router();

contactRouters.post("/:id", ensureAuthMiddleware, createUserContactController);
contactRouters.get("/:id", listUserController);
contactRouters.delete(
  "/:id/:contactId",
  ensureAuthMiddleware,
  isSameUserMiddleware,
  deleteUserContactController
);

export default contactRouters;
