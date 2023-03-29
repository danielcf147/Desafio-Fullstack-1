import api from "../services/api";
import { IProviderProps, IUserRegister } from "../interface/index";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useContext, useState } from "react";

interface RegisterProviderData {
  registerUser: (userData: IUserRegister) => void;
}

const RegisterContext = createContext<RegisterProviderData>(
  {} as RegisterProviderData
);

export const RegisterProvider = ({ children }: IProviderProps) => {
  const [avatar, setAvatar] = useState("");
  const toast = useToast();
  const router = useRouter();
  const registerUser = async (userData: IUserRegister) => {
    api
      .post("/user", userData)
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
  return (
    <RegisterContext.Provider value={{ registerUser }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterAuth = () => useContext(RegisterContext);
