import AppDataSource from "../../data-source";
import { UserContact } from "../../entities/userContactsEntity";
import { User } from "../../entities/usersEntity";
import { IContact } from "../../interfaces/contact/contact.interface";
import { AppError } from "../../errors";

const listUserContactService = async (id: string): Promise<IContact[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: id });

  if (findUser.isActive === false) {
    throw new AppError("User is unactive", 400);
  }
  const contactRepository = AppDataSource.getRepository(UserContact);

  const contactQueryBuilder =
    contactRepository.createQueryBuilder("userContact");

  const contact = contactQueryBuilder.where("userContact.userId = :id", {
    id: id,
  });

  return contact.getMany();
};
export default listUserContactService;
