import React, { useState } from "react";
import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import introVideo from "../../assets/videos/introVideo2.mp4";

function CoursePage() {
  const lectureTitle = "Lecture title";
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: "sagedafgetr",
      title: "sample1",
      description: "nothing jst putting a little description.",
      video: {
        url: "sagerag",
      },
    },
    {
      _id: "sagedafgetr",
      title: "sample2",
      description: "nothing jst putting a little description.",
      video: {
        url: "sagerag",
      },
    },
    {
      _id: "sagedafgetr",
      title: "sample3",
      description: "nothing jst putting a little description.",
      video: {
        url: "sagerag",
      },
    },
  ];
  return (
    <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
      <Box>
        <video
          width={"100%"}
          src={introVideo}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
        <Heading
          m={"4"}
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        />
        <Heading m={"4"} children="Description" />
        <Text m={"4"} children={`${lectures[lectureNumber].description}`} />
      </Box>
      <VStack>
        {lectures.map((element, index) => {
          return (
            <button
              onClick={() => setLectureNumber(index)}
              key={element._id}
              style={{
                width: "100%",
                padding: "1rem",
                textAlign: "center",
                margin: 0,
                borderBottom: "1px solid rgba(0, 0, 0, 0.2",
              }}
            >
              <Text noOfLines={1}>
                #{index + 1} {element.title}
              </Text>
            </button>
          );
        })}
      </VStack>
    </Grid>
  );
}

export default CoursePage;
