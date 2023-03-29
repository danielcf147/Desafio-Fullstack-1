import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest } from "../../interfaces/user/user.interface";

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  password: yup.string().required(),
});

const userResponser: SchemaOf<IUser> = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.number().required(),
  createdAt: yup.date(),
});

const allUsersSerializer: SchemaOf<IUser[]> = yup.array(
  yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    phoneNumber: yup.number().required(),
    createdAt: yup.date(),
  })
);

export { userRequestSerializer, userResponser, allUsersSerializer };
