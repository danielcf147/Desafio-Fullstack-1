import { Request, Response } from "express";
import createUserContactService from "../services/contact/createUserContact.service";

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
export default createUserContactController;
