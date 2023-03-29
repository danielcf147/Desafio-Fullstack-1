import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserLogin, IUserRegister } from "../interface";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/authContext";
import { useRegisterAuth } from "@/contexts/registerContext";

const ModalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { login, registerUser } = useAuth();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid Email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState("");

  const nameError = nameInput === "";
  const emailError = emailInput === "";
  const passwordError = passwordInput === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(formSchema),
  });

  const loginFormSubmit = (formData: IUserLogin) => {
    login(formData);
  };

  return (
    <>
      <Button
        variant="default"
        bg="slateblue"
        border="slateblue"
        onClick={() => setModalType("login")}
      >
        Login
      </Button>

      <Modal isOpen={modalType === "login"} onClose={() => setModalType("")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="email" isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="email"
                {...register("email")}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Digite seu e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isRequired isInvalid={passwordError}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!passwordError ? (
                <FormHelperText>digite sua senha</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              variant={"default"}
              onClick={handleSubmit(loginFormSubmit)}
              _hover={{
                bg: "blue.700",
              }}
            >
              Sign in
            </Button>
            <Button size="lg" onClick={() => setModalType("")}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ModalForm;
