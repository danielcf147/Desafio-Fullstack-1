import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { UserContact } from "../../entities/userContactsEntity";
import { AppError } from "../../errors";

const deleteUserContactService = async (contactId: string) => {
  const userContactRepository = AppDataSource.getRepository(UserContact);
  const userContact = await userContactRepository.findOneBy({
    id: contactId,
  });

  if (!userContact) {
    throw new AppError("Contact not found", 400);
  }

  await userContactRepository.delete({ id: contactId });

  return {};
};

export default deleteUserContactService;
