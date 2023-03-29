import { ReactNode } from "react";

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister {
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

export interface IProviderProps {
  children: ReactNode;
}

export interface IContact extends IUser {}

export interface ICreateContact {
  contactId: string;
}
