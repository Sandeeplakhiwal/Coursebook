import React, { useState, useEffect } from "react";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/actions/profileAction";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector((state) => state.profile);

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
          Change Password
        </Heading>
        <VStack spacing={"8"}>
          <Input
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type={"password"}
            focusBorderColor="yellow.500"
          />

          <Input
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            type={"password"}
            focusBorderColor="yellow.500"
          />
          <Button w={"full"} colorScheme="yellow" type="submit">
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default ChangePassword;
