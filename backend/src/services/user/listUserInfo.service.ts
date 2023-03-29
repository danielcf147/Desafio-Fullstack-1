import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { IUser } from "../../interfaces/user/user.interface";
import { userResponser } from "../../serializers/user/user.serializer";

const listUserInfoService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: id });
  const response = await userResponser.validate(findUser, {
    stripUnknown: true,
  });
  return response;
};
export default listUserInfoService;
