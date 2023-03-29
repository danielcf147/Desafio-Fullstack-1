export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  createdAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface ILoginRequest {
  email: string;
  password: string;
}
