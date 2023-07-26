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
import { toast } from "react-hot-toast";
import { requestNewCourse } from "../../redux/actions/otherAction";

function Request() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const dispatch = useDispatch();

  const { error, message, loading } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(requestNewCourse(name, email, course));
  };

  return (
    <Container h={"105vh"}>
      <VStack h={"full"} justifyContent="center">
        <Heading children="Request New Course" />
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
            <FormLabel htmlFor="course" children="course" />
            <Input
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Explain the course..."
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
