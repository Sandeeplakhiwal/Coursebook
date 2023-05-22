import React from "react";
import { Box, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from "react-icons/ti";
import { DiGithub } from "react-icons/di";

function Footer() {
  return (
    <Box padding={4} bg={"blackAlpha.900"} minH={"10vh"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} width="full">
          <Heading
            // fontSize={"1xl"}
            color={"white"}
            children="All Rights Reserverd"
          />
          <Heading
            fontFamily="body"
            size={"sm"}
            color={"yellow.400"}
            children="@Seekomu"
          />
        </VStack>

        <HStack
          spacing={["2", "10"]}
          justifyContent={["center", "center"]}
          color="white"
          fontSize={50}
        >
          <a target="blank" href="https://www.instagram.com/sandeep.lakhiwal/">
            <TiSocialInstagramCircular />
          </a>
          <a target="blank" href="https://github.com/Sandeeplakhiwal">
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
}

export default Footer;
