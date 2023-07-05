import React from "react";
import { Spinner, VStack } from "@chakra-ui/react";

function Loader({ color = "yellow.500" }) {
  return (
    <VStack h={"100vh"} justifyContent={"center"}>
      <div>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="transparent"
          color={color}
          size="xl"
        />
      </div>
    </VStack>
  );
}

export default Loader;
