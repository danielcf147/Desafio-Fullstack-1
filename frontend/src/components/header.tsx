import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Modalform from "./modalForm";
import RegisterModalForm from "./registerModalForm";
import { destroyCookie } from "nookies";
import { useAuth } from "@/contexts/authContext";
import NextLink from "next/link";
import ContactModalForm from "./createContactModal";

const Links = ["Posts", "Tags", "About"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "slateblue",
      color: "white",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

interface IHeaderProps {
  name?: string;
  isLogged?: boolean;
}

const Header = ({ name, isLogged = false }: IHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { avatar } = useAuth();
  const router = useRouter();
  const logout = () => {
    destroyCookie(null, "token");
    destroyCookie(null, "user");
    destroyCookie(null, "id");
    router.push("/");
  };

  return (
    <>
      <Box bg={"slateblue"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontWeight={"bold"} fontSize={20} color={"white"}>
                Desafio1
              </Text>
            </Box>
            <HStack
              color={"white"}
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            {isLogged ? (
              <>
                <ContactModalForm />
                <Text color={"white"} paddingRight={2}>
                  {name}
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={avatar} />
                  </MenuButton>
                  <MenuList bg={"slateblue"}>
                    <MenuItem
                      bg={"slateblue"}
                      color={"white"}
                      onClick={() => logout()}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Modalform />
                <RegisterModalForm />
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={6} color={"white"}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
