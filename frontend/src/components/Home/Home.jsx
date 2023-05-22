import React from "react";
import {
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Box,
  HStack,
} from "@chakra-ui/react";
import "./home.css";
import vg from "../../assets/images/barber-shop.png";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";
import YoutubeEmbed from "../../assets/youtubeEmbed/YoutubeEmbed";
import introVideo from "../../assets/videos/introVideo2.mp4";

function Home() {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height="100%"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={["16", "56"]}
        >
          <VStack
            width={"full"}
            alignItems={["center", "flex-end"]}
            spacing="8"
          >
            <Heading children="LEARN FROM THE EXPERT" size={"2xl"} />
            <Text
              fontFamily={"cursive"}
              fontSize={"2xl"}
              textAlign={["center", "left"]}
              children="Find Valuable Content At Reasonable Price"
            />
            <Link to="/courses">
              <Button size={"lg"} colorScheme={"yellow"}>
                Explore now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={"md"}
            src={vg}
            objectFit={"contain"}
          />
        </Stack>
      </div>

      <Box padding={"8"} bg={"blackAlpha.800"}>
        <Heading
          textAlign={"center"}
          fontFamily={"body"}
          color={"yellow.400"}
          children="Our Brands"
        />
        <HStack
          className="brandsBanner"
          justifyContent={"space-evenly"}
          marginTop={"4"}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          src={introVideo}
          muted
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
      </div>
    </section>
  );
}

export default Home;
