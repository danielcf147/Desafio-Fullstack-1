import { hashSync, genSalt } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";
import { IUser, IUserUpdate } from "../../interfaces/user/user.interface";
import { userResponser } from "../../serializers/user/user.serializer";

const updateUserService = async (
  id: string,
  data: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const keys = Object.keys(data);

  const invalidKey = keys.find((key) => {
    return key === "id";
  });

  if (invalidKey) {
    throw new AppError("Cant update id", 401);
  }

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (data.password) {
    const salt = await genSalt(10);
    data.password = await hashSync(data.password, salt);
  }

  const updatedUser = userRepository.create({
    ...user,
    ...data,
  });
  await userRepository.save(updatedUser);

  const response = await userResponser.validate(updatedUser, {
    stripUnknown: true,
  });

  return response;
};

export default updateUserService;
