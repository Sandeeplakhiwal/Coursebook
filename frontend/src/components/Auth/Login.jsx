import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, login } from "../../redux/actions/userAction.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const { loading } = useSelector((state) => state.user);

  return (
    <Container h={"120vh"}>
      <VStack h={"full"} justifyContent="center" spacing={"16"}>
        <Heading children={"Welcome to Coursebook"} />
        <form style={{ width: "100%" }}>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={"email"}
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={"password"}
              focusBorderColor={"yellow.500"}
            />
          </Box>

          <Box>
            <Link to={"/forgotpassword"}>
              <Button colorScheme={"red"} variant={"ghost"} fontSize="sm">
                Forget Password
              </Button>
            </Link>
          </Box>
          <Button
            my={4}
            colorScheme="yellow"
            type={"submit"}
            onClick={(e) => submitHandler(e)}
            isLoading={loading}
          >
            Login
          </Button>

          <Box my={4}>
            New User ?{" "}
            <Link to={"/register"}>
              <Button variant={"link"} colorScheme="yellow">
                Signup
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Login;
