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
import { ICreateContact } from "../interface";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/authContext";

const ContactModalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createContact } = useAuth();

  const formSchema = yup.object().shape({
    contactId: yup.string().required(),
  });

  const [contactIdInput, setContactIdInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState("");

  const contactIdError = contactIdInput === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateContact>({
    resolver: yupResolver(formSchema),
  });

  const loginFormSubmit = (formData: ICreateContact) => {
    createContact(formData);
  };

  return (
    <>
      <Button
        variant="default"
        bg="slateblue"
        border="slateblue"
        onClick={() => setModalType("contact")}
      >
        Create Contact
      </Button>

      <Modal isOpen={modalType === "contact"} onClose={() => setModalType("")}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create contact</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="contactId" isRequired isInvalid={contactIdError}>
              <FormLabel>Contact ID</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="string"
                {...register("contactId")}
                onChange={(e) => setContactIdInput(e.target.value)}
              />
              {!contactIdError ? (
                <FormHelperText>Type your contact id</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.contactId?.message}</FormErrorMessage>
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
              Register Contact
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
export default ContactModalForm;
