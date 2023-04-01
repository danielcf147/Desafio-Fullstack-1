import { Request, Response } from "express";
import { IUserRequest, ILoginRequest } from "../interfaces/user/user.interface";
import createUserService from "../services/user/createUser.service";
import loginUserService from "../services/user/loginUser.service";
import listUserService from "../services/user/listUser.service";
import listUserInfoService from "../services/user/listUserInfo.service";
import updateUserService from "../services/user/updateUSer.service";
import deleteUserService from "../services/user/deleteUser.service";

const createUserController = async (request: Request, response: Response) => {
  const userData: IUserRequest = request.body;
  const newUser = await createUserService(userData);
  return response.status(201).json(newUser);
};

const loginUserController = async (request: Request, response: Response) => {
  const loginData: ILoginRequest = request.body;
  const token = await loginUserService(loginData);
  return response.json({ token });
};

const listUserController = async (request: Request, response: Response) => {
  const id = request.params.id;

  const movies = await listUserService(id);

  return response.status(200).json(movies);
};

const listUserInfoController = async (request: Request, response: Response) => {
  const id = request.user.id;
  const findUser = await listUserInfoService(id);
  return response.status(200).json(findUser);
};

const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = await updateUserService(id, data);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await deleteUserService(id);
  return res.status(204).json(deletedUser);
};

export {
  createUserController,
  loginUserController,
  listUserController,
  listUserInfoController,
  updateUserController,
  deleteUserController,
};
