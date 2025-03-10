import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";
import { IUser, IUserRequest } from "../../interfaces/user/user.interface";
import { userResponser } from "../../serializers/user/user.serializer";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const email = userData.email;

  const emailUnavailable = await userRepository.findOneBy({
    email: email,
  });

  if (emailUnavailable) {
    throw new AppError("User already exists", 409);
  }

  const user = userRepository.create(userData);
  await userRepository.save(user);

  const response = await userResponser.validate(user, { stripUnknown: true });

  return response;
};
export default createUserService;
