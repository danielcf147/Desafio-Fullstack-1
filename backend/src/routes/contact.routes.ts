import { Router } from "express";
import {
  createUserContactController,
  listUserController,
} from "../controllers/userContact.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";

const contactRouters = Router();

contactRouters.post("/:id", ensureAuthMiddleware, createUserContactController);
contactRouters.get("/:id", listUserController);

export default contactRouters;
