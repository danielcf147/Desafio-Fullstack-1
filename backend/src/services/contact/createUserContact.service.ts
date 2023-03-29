import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { UserContact } from "../../entities/userContactsEntity";
import { AppError } from "../../errors";
import {
  IContact,
  IContactRequest,
} from "../../interfaces/contact/contact.interface";
import { userResponser } from "../../serializers/user/user.serializer";

const createUserContactService = async (
  userData: IContactRequest
): Promise<IContact> => {
  if (userData.contactId == userData.userId) {
    throw new AppError("You can't make your self as contact", 400);
  }
  const userRepository = AppDataSource.getRepository(User);
  const contactId = userData.contactId;

  const contactExists = await userRepository.findOneBy({
    id: contactId,
  });

  if (!contactExists) {
    throw new AppError("User not found", 404);
  }

  const userContactRepository = AppDataSource.getRepository(UserContact);

  const user = await userRepository.findOneBy({ id: userData.userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contact = userContactRepository.create({
    name: contactExists.name,
    email: contactExists.email,
    phoneNumber: contactExists.phoneNumber,
    user: user,
  });

  await userContactRepository.save(contact);

  const response = await userResponser.validate(contact, {
    stripUnknown: true,
  });

  return response;
};

export default createUserContactService;
