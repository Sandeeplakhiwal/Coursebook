import React, { useState } from "react";
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

function ResetPassword() {
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const params = useParams();

  console.log(params.token);
  return (
    <Container h={"100vh"} py="16">
      <form
        style={{
          width: "100%",
        }}
      >
        <Heading
          children="Reset Password"
          my={16}
          textTransform="uppercase"
          textAlign={["center", "left"]}
        />
        <VStack spacing={8}>
          {/*           <Box width={"100%"}>
            <FormLabel htmlFor="password" children="Old Password" />
            <Input
              required
              type={"password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              focusBorderColor={"yellow.500"}
            />
          </Box> */}
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
          <Button colorScheme={"yellow"} type="submit" width={"full"}>
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default ResetPassword;
