import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userAction.js";

const LinkButton = ({ url, title, onClose }) => {
  return (
    <Link to={url} onClick={onClose}>
      <Button variant={"ghost"}>{title}</Button>
    </Link>
  );
};

function Header(isAuthenticated = false, user) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    onClose();
    dispatch(logout());
  };
  let isUserAuthenticated = isAuthenticated.isAuthenticated;
  let theUser = isAuthenticated.user;
  console.log(isAuthenticated.isAuthenticated);
  console.log(theUser);
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={"yellow"}
        width="12"
        height={"12"}
        rounded="full"
        zIndex={"overlay"}
        position={"fixed"}
        top="6"
        left={"6"}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={"blur(2px)"} />
        <DrawerContent>
          <DrawerHeader borderBottom={"1px"}>Coursebook</DrawerHeader>
          <DrawerBody>
            <VStack spacing={"4"} alignItems="flex-start">
              <LinkButton url={"/"} title="home" onClose={onClose} />
              <LinkButton
                url={"/courses"}
                title="Browse All Courses"
                onClose={onClose}
              />
              <LinkButton
                url={"/request"}
                title="Request a course"
                onClose={onClose}
              />
              <LinkButton
                url={"/contact"}
                title="Contact Us"
                onClose={onClose}
              />
              <LinkButton url={"/about"} title="About Us" onClose={onClose} />
            </VStack>
            <HStack
              justifyContent={"space-evenly"}
              position="absolute"
              bottom={"2rem"}
              width={"80%"}
            >
              {isUserAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link to={"/profile"} onClick={onClose}>
                        <Button colorScheme={"yellow"} variant={"ghost"}>
                          Profile
                        </Button>
                      </Link>
                      <Link onClick={onClose}>
                        <Button variant={"ghost"} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </Link>
                    </HStack>
                    {theUser && theUser.role === "admin" && (
                      <Link to={"/admin/dashboard"} onClick={onClose}>
                        <Button colorScheme={"purple"} variant="ghost">
                          <RiDashboardFill
                            style={{
                              margin: "4px",
                            }}
                          />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link to={"/login"} onClick={onClose}>
                    <Button colorScheme={"yellow"}>Login</Button>
                  </Link>
                  <p>OR</p>
                  <Link to={"/register"} onClick={onClose}>
                    <Button colorScheme={"yellow"}>Signup</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
