import AppDataSource from "../../data-source";
import { UserContact } from "../../entities/userContactsEntity";
import { allUsersSerializer } from "../../serializers/user/user.serializer";
import { IContact } from "../../interfaces/contact/contact.interface";

const listUserService = async (id: string): Promise<IContact[]> => {
  const contactRepository = AppDataSource.getRepository(UserContact);

  const contactQueryBuilder =
    contactRepository.createQueryBuilder("userContact");

  const contact = contactQueryBuilder.where("userContact.userId = :id", {
    id: id,
  });

  return contact.getMany();
};
export default listUserService;
