import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "#ECC94B",
  backgroundColor: "white",
};

const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatarPrev, setAvatarPrev] = useState("");
  const [avatar, setAvatar] = useState("");
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPrev(reader.result);
      setAvatar(file);
    };
  };

  return (
    <Container h={"150vh"}>
      <VStack h={"full"} justifyContent="center" spacing={"8"}>
        <Heading children="Registration" textTransform="uppercase" />
        <form style={{ width: "100%" }}>
          <Box display={"flex"} justifyContent="center">
            <Avatar size={"2xl"} src={avatarPrev} />
          </Box>
          <Box>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              type={"text"}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email" />
            <Input
              required
              type={"email"}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="password" children="Create a Password" />
            <Input
              required
              type={"password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              type={"file"}
              accept="image/"
              id="chooseAvatar"
              focusBorderColor={"yellow.500"}
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
          <Button type={"submit"} colorScheme="yellow" my={4}>
            SignUp
          </Button>
          <Box my={4}>
            Already have an account ?{" "}
            <Link to={"/login"}>
              <Button variant={"link"} colorScheme="yellow">
                Login
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Register;
