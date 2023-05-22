import React, { useState } from "react";
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
function Request() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  return (
    <Container h={"105vh"}>
      <VStack h={"full"} justifyContent="center">
        <Heading children="Request New Course" />
        <form style={{ width: "100%" }}>
          <Box my={4}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type={"text"}
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={"email"}
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="course" children="course" />
            <Input
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Explain the course..."
              focusBorderColor={"yellow.500"}
            />
          </Box>

          <Button my={4} colorScheme="yellow" type={"submit"}>
            Send
          </Button>

          <Box my={4}>
            See available courses{" "}
            <Link to={"/courses"}>
              <Button variant={"link"} colorScheme="yellow">
                Click
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Request;
