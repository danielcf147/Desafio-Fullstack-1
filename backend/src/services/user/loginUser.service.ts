import {
  IUserLogin,
  ILoginRequest,
} from "../../interfaces/user/user.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/usersEntity";
import { AppError } from "../../errors";
import "dotenv/config";

const loginUserService = async ({
  email,
  password,
}: ILoginRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  if (user.isActive === false) {
    throw new AppError("User is unactive", 400);
  }

  const token = jwt.sign(
    {
      email: email,
      id: user.id,
    },
    process.env.SECRET_KEY,
    {
      subject: String(user.id),
      expiresIn: "24h",
    }
  );

  return token;
};

export default loginUserService;
