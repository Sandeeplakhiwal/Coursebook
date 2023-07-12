import React, { useEffect, useState } from "react";
import programmingImg from "../../assets/images/programming.jpg";
import {
  Container,
  Heading,
  HStack,
  Input,
  Text,
  Button,
  Stack,
  VStack,
  Image,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseAction.js";

import { Link } from "react-router-dom";

export function Course({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) {
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image src={imageSrc} boxSize="60" objectFit={"cover"} />
      <Heading
        textAlign={["center", "left"]}
        maxW="200px"
        size={"sm"}
        noOfLines={3}
        fontFamily={"sans-serif"}
        children={title}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={"bold"}
          textTransform={"uppercase"}
          children={"creator"}
        />
        <Text
          fontFamily={"body"}
          textTransform={"uppercase"}
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={"center"}
        size="xs"
        children={`Lectures - ${lectureCount}`}
        textTransform={"uppercase"}
      />
      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"yellow"}>Watch Now</Button>
        </Link>
        <Button
          variant={"ghost"}
          colorScheme={"yellow"}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
}

function courses() {
  const [keyword, setKeyWord] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
  }, [category, keyword, dispatch]);

  const Categories = [
    "Web development",
    "Artificial Intelligence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
  ];

  const addToPlaylistHandler = () => {
    console.log("Added to playlist.");
  };

  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
      <Heading children="All Courses" m={"10"} />
      <Input
        value={keyword}
        type={"text"}
        placeholder="Search a course..."
        onChange={(e) => setKeyWord(e.target.value)}
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={"auto"}
        py="8"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {Categories.map((item, index) => {
          return (
            <Button key={index} minW={"60"} onClick={() => setCategory(item)}>
              <Text children={item} />
            </Button>
          );
        })}
      </HStack>
      <Stack
        direction={["column", "row"]}
        flexWrap={"wrap"}
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        <Course
          title={"Sample"}
          description={"Sample"}
          imageSrc={programmingImg}
          views={400}
          id={"Sample"}
          creator={"Sample boy"}
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  );
}

export default courses;
