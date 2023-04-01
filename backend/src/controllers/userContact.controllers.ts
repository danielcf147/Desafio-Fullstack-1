import { Request, Response } from "express";
import createUserContactService from "../services/contact/createUserContact.service";
import listUserContactService from "../services/contact/listUserContact.service";

const createUserContactController = async (
  request: Request,
  response: Response
) => {
  const contactId = request.params.id;
  const userId = request.user.id;
  const dataToSend = { contactId: contactId, userId: userId };
  const createSchedule = await createUserContactService(dataToSend);
  return response.status(201).json({ message: createSchedule });
};

const listUserController = async (request: Request, response: Response) => {
  const id = request.params.id;

  const movies = await listUserContactService(id);

  return response.status(200).json(movies);
};
export { createUserContactController, listUserController };
