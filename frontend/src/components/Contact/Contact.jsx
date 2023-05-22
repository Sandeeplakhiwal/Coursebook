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
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Container h={"105vh"}>
      <VStack h={"full"} justifyContent="center">
        <Heading children="Contact Us" />
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
            <FormLabel htmlFor="message" children="Send a message" />
            <Input
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message...."
              focusBorderColor={"yellow.500"}
            />
          </Box>

          <Button my={4} colorScheme="yellow" type={"submit"}>
            Send
          </Button>

          <Box my={4}>
            Request for a course ?{" "}
            <Link to={"/request"}>
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

export default Contact;
