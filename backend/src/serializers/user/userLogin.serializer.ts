import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../../interfaces/user/user.interface";

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default userLoginSerializer;
