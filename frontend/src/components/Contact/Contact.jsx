import React, { useEffect, useState } from "react";
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
import { contact } from "../../redux/actions/otherAction";
import { toast } from "react-hot-toast";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const {
    error,
    message: contactMessage,
    loading,
  } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (contactMessage) {
      toast.success(contactMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, contactMessage, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contact(name, email, message));
  };

  return (
    <Container h={"105vh"}>
      <VStack h={"full"} justifyContent="center">
        <Heading children="Contact Us" />
        <form style={{ width: "100%" }} onSubmit={submitHandler}>
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

          <Button
            isLoading={loading}
            my={4}
            colorScheme="yellow"
            type={"submit"}
          >
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
