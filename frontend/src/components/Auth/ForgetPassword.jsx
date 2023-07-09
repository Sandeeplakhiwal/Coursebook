import React, { useState, useEffect } from "react";
import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/profileAction";
import { toast } from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
    <Container h={"90vh"} py="16">
      <form
        style={{
          width: "100%",
        }}
        onSubmit={submitHandler}
      >
        <Heading
          children="Forgot Password"
          my={16}
          textTransform="uppercase"
          textAlign={["center", "left"]}
        />
        <VStack spacing={8}>
          <Input
            required
            type={"email"}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            focusBorderColor={"yellow.500"}
          />

          <Button colorScheme={"yellow"} type="submit" width={"full"}>
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default ForgetPassword;
