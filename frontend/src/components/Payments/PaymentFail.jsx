import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function PaymentFail() {
  return (
    <Container p="16" h={"90vh"}>
      <VStack pb="16" justifyContent={"center"} h="full" spacing={"4"}>
        <RiErrorWarningFill size={"5rem"} />
        <Heading my={"8"} textTransform="uppercase" children="Payment Fail" />
        <Link to={"/"}>
          <Button variant={"ghost"}>Try Again</Button>
        </Link>
      </VStack>
    </Container>
  );
}

export default PaymentFail;
