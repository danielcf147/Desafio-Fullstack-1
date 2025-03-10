import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError("User not found", 400);
  }

  if (user.isActive === false) {
    throw new AppError("User already deleted", 400);
  }

  user.isActive = false;
  await userRepository.save(user);

  return {};
};

export default deleteUserService;
