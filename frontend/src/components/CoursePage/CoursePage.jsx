import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import introVideo from "../../assets/videos/introVideo2.mp4";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCourseLectures } from "../../redux/actions/courseAction.js";
import toast from "react-hot-toast";

function CoursePage({ user }) {
  const [lectureNumber, setLectureNumber] = useState(0);

  const params = useParams();
  const dispatch = useDispatch();

  var { lectures: courseLectures } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  console.log(courseLectures);

  var lectures = [
    {
      _id: "sagedafgetr",
      title: "sample1",
      description: "nothing jst putting a little description.",
      video: {
        url: "sagerag",
      },
    },
    {
      _id: "sagedafgets",
      title: "sample2",
      description: "nothing jst putting a little description.",
      video: {
        url: "sagerag",
      },
    },
    {
      _id: "sagedafgett",
      title: "sample3",
      description: "nothing jst putting a larger description.",
      video: {
        url: "sagerag",
      },
    },
  ];

  if (
    user.role !== "admin" &&
    (user.subscription === undefined || user.subscription.status !== "active")
  ) {
    return <Navigate to={"/subscribe"} />;
  }

  if (courseLectures.length >= 1) {
    lectures = courseLectures;
  }

  return (
    <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
      <Box>
        <video
          width={"100%"}
          src={lectures[lectureNumber].video.url}
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
