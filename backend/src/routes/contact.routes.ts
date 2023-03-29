import { Router } from "express";
import createUserContactController from "../controllers/userContact.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";

const contactRouters = Router();

contactRouters.post("/:id", ensureAuthMiddleware, createUserContactController);

export default contactRouters;
