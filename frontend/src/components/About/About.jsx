import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import introVideo from "../../assets/videos/introVideo.mp4";
import { RiSecurePaymentFill } from "react-icons/ri";
import termsAndConditions from "../../assets/docs/termsAndCondition";

const Founder = () => {
  return (
    <Stack direction={["column", "row"]} spacing={["4", "16"]} padding="8">
      <VStack width={"100%"}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/95290795?v=4"
          boxSize={["40", "48"]}
        />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>

      <VStack
        width={"100%"}
        justifyContent="center"
        alignItems={["center", "flex-start"]}
      >
        <Heading children="Sandeep" size={["md", "xl"]} />
        <Text
          textAlign={["center", "left"]}
          children="Hi, I am a full-stack developer and a teacher.
        Our mission is to provide quality content at a reasonable price."
        />
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        src={introVideo}
        autoPlay
        muted
        loop
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      ></video>
    </Box>
  );
};

const TandC = ({ termsAndCondition }) => {
  return (
    <Box>
      <Heading
        size={"md"}
        children="Terms & Condition"
        textAlign={["center", "left"]}
        my="4"
      />
      <Box h={"sm"} p="4" overflowY={"scroll"}>
        <Text textAlign={["center", "left"]} letterSpacing={"widest"}>
          {termsAndCondition}
        </Text>
        <Heading
          my={"4"}
          size="xs"
          children="Refund only applicable for cancellaion."
        />
      </Box>
    </Box>
  );
};

function About() {
  return (
    <Container maxW={"3xl"} padding={16} boxShadow="lg">
      <Heading children="About Us" textAlign={["center", "center"]} />

      <Founder />

      <Stack m={"8"} direction={["column", "row"]} alignItems="center">
        <Text fontFamily={"cursive"} m="8" textAlign={["center", "left"]}>
          We are a video streaming platfrom with some premium courses available
          only for premium users.
        </Text>

        <Link to={"/subscribe"}>
          <Button variant={"ghost"} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndCondition={termsAndConditions} />

      <HStack my={"4"} p="4">
        <RiSecurePaymentFill />
        <Heading
          size={"xs"}
          fontFamily="sans-serif"
          children="Payment is secured by Razorpay"
          textTransform={"uppercase"}
        />
      </HStack>
    </Container>
  );
}

export default About;
