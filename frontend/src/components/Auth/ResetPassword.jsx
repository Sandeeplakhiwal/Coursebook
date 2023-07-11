import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/profileAction";
import toast from "react-hot-toast";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState();
  const params = useParams();

  // console.log(params.token);

  const { loading, message, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };

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
    <Container h={"100vh"} py="16">
      <form
        style={{
          width: "100%",
        }}
        onSubmit={submitHandler}
      >
        <Heading
          children="Reset Password"
          my={16}
          textTransform="uppercase"
          textAlign={["center", "left"]}
        />
        <VStack spacing={8}>
          <Box width={"100%"}>
            <FormLabel htmlFor="password" children="New Password" />
            <Input
              required
              type={"password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              focusBorderColor={"yellow.500"}
            />
          </Box>
          <Button
            isLoading={loading}
            colorScheme={"yellow"}
            type="submit"
            width={"full"}
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default ResetPassword;
