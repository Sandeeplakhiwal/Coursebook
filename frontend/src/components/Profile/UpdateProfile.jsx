import React, { useEffect, useState } from "react";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/profileAction";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
  };

  const { loading, message, error } = useSelector((state) => state.profile);
  console.log(loading, message, error);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [message, error, dispatch]);

  return (
    <Container py={"16"} minH="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={"uppercase"}
          my={"16"}
          textAlign={["center", "left"]}
        >
          Update Profile
        </Heading>
        <VStack spacing={"8"}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type={"text"}
            focusBorderColor="yellow.500"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type={"email"}
            focusBorderColor="yellow.500"
          />
          <Button w={"full"} colorScheme="yellow" type="submit">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default UpdateProfile;
