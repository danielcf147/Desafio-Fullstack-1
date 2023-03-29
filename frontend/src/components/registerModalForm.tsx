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

const RegisterModalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { registerUser } = useAuth();

  const formRegisterSchema = yup.object().shape({
    name: yup.string().required("Must have a name"),
    email: yup
      .string()
      .email("Must be a valid Email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    phoneNumber: yup.number().required("Must have a phone number"),
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
  const phoneNumberError = phoneNumberInput === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(formRegisterSchema),
  });

  const registerFormSubmit = (formData: IUserRegister) => {
    registerUser(formData);
  };

  return (
    <>
      <Button
        variant="default"
        bg="slateblue"
        border="slateblue"
        onClick={() => setModalType("register")}
      >
        Register
      </Button>

      <Modal isOpen={modalType === "register"} onClose={() => setModalType("")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creat an account</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="name" isRequired isInvalid={nameError}>
              <FormLabel>Name</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="string"
                {...register("name")}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Type your Name</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
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
            <FormControl
              id="phone number"
              isRequired
              isInvalid={phoneNumberError}
            >
              <FormLabel>Phone number</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="number"
                {...register("phoneNumber")}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              {!phoneNumberError ? (
                <FormHelperText>Type your Name</FormHelperText>
              ) : (
                <FormErrorMessage>
                  {errors.phoneNumber?.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              variant={"default"}
              onClick={handleSubmit(registerFormSubmit)}
              _hover={{
                bg: "blue.700",
              }}
            >
              Sign up
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
export default RegisterModalForm;
