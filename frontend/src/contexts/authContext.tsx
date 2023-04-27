import api from "../services/api";
import { IUserLogin, IProviderProps, ICreateContact } from "../interface/index";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie, parseCookies } from "nookies";
import { createContext, useContext, useState } from "react";

interface AuthProviderData {
	login: (userData: IUserLogin) => void;
	avatar: string;
	registerUser: (userData: IUserLogin) => void;
	createContact: (userData: ICreateContact) => void;
}

export const AuthContext = createContext<AuthProviderData>(
	{} as AuthProviderData
);

export const AuthProvider = ({ children }: IProviderProps) => {
	const [token, setToken] = useState("");
	const [avatar, setAvatar] = useState("");
	const toast = useToast();
	const router = useRouter();

	const login = async (userData: IUserLogin) => {
		api.post("/user/login", userData)
			.then((response) => {
				setToken(response.data.token);
				setCookie(null, "token", response.data.token, {
					maxAge: 60 * 30,
					path: "/",
				});

				setAvatar(response.data.avatar);
				toast({
					title: "sucess",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box
							color={"gray.50"}
							p={3}
							bg={"green.600"}
							fontWeight={"bold"}
							borderRadius={"md"}
						>
							Login successful !
						</Box>
					),
				});
				router.push("/dashboard");

				api.get("/user", {
					headers: {
						Authorization: `Basic ${response.data.token}`,
					},
				}).then((response) => {
					setCookie(null, "user", response.data.name, {
						maxAge: 60 * 30,
						path: "/",
					});
					setCookie(null, "id", response.data.id, {
						maxAge: 60 * 30,
						path: "/",
					});
					console.log(response);
				});
			})
			.catch((err) => {
				toast({
					title: "error",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box
							color={"gray.50"}
							p={3}
							bg={"red.600"}
							fontWeight={"bold"}
							borderRadius={"md"}
						>
							Error, invalid login or password!
						</Box>
					),
				});
			});
	};

	const registerUser = async (userData: IUserLogin) => {
		api.post("/user", userData)
			.then((response) => {
				console.log(response);
				setCookie(null, "token", response.data.token, {
					maxAge: 60 * 30,
					path: "/",
				});
				setCookie(null, "user", response.data.email, {
					maxAge: 60 * 30,
					path: "/",
				});
				setAvatar(response.data.avatar);
				toast({
					title: "sucess",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box
							color={"gray.50"}
							p={3}
							bg={"green.600"}
							fontWeight={"bold"}
							borderRadius={"md"}
						>
							Registration successful !
						</Box>
					),
				});
				router.push("/dashboard");
			})
			.catch((err) => {
				toast({
					title: "error",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box
							color={"gray.50"}
							p={3}
							bg={"red.600"}
							fontWeight={"bold"}
							borderRadius={"md"}
						>
							Something went wrong...
						</Box>
					),
				});
			});
	};

	const createContact = async (userData: ICreateContact) => {
		const { token } = parseCookies();
		api.post(`/contact/${userData.contactId}`, null, {
			headers: {
				Authorization: `Basic ${token}`,
			},
		})
			.then((response) => {
				router.push("/dashboard");
			})
			.catch((err) => {
				toast({
					title: "error",
					variant: "solid",
					position: "top-right",
					isClosable: true,
					render: () => (
						<Box
							color={"gray.50"}
							p={3}
							bg={"red.600"}
							fontWeight={"bold"}
							borderRadius={"md"}
						>
							Error, invalid contact ID!
						</Box>
					),
				});
			});
	};

	return (
		<AuthContext.Provider
			value={{ login, registerUser, createContact, avatar }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
