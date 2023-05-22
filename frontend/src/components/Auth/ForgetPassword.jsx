import React, { useState } from "react";
import { Container, Heading, VStack, Input, Button } from "@chakra-ui/react";

function ForgetPassword() {
  const [email, setEmail] = useState();
  return (
    <Container h={"90vh"} py="16">
      <form
        style={{
          width: "100%",
        }}
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
