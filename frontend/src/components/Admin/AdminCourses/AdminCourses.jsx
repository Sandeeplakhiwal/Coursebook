import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture } from "../../../redux/actions/adminAction";
import {
  getAllCourses,
  getCourseLectures,
} from "../../../redux/actions/courseAction";
import Sidebar from "../Sidebar";
import CourseModel from "./CourseModel";

function AdminCourses() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  var { courses: adminCourses, lectures } = useSelector(
    (state) => state.course
  );

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const dispatch = useDispatch();

  var courses = [
    {
      _id: "eawrt",
      poster: {
        url: "https://cdn.pixabay.com/photo/2016/11/19/15/32/laptop-1839876_1280.jpg",
      },
      title: "Mern Stack Course",
      category: "Coding",
      createdBy: "Sandeep Lakhiwal",
      views: 900,
      numOfVideos: 10,
    },
  ];

  if (adminCourses.length >= 1) {
    courses = adminCourses;
  }

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const courseDetailsHandler = (courseId, courseTitle) => {
    setCourseId(courseId);
    setCourseTitle(courseTitle);
    dispatch(getCourseLectures(courseId));
    onOpen();
  };
  const deleteButtonHandler = (userId) => {
    console.log(userId, "deleted");
  };
  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId, lectureId);
    dispatch(deleteCourseLecture(courseId, lectureId));
  };
  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };

  return (
    <Grid
      css={{
        cursor: `default`,
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box p={["0", "8"]} overflowX="auto">
        <Heading
          textTransform={"uppercase"}
          my="16"
          textAlign={["center", "left"]}
          children="All Courses"
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size="lg">
            <TableCaption>All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((item) => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetailsHandler={courseDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
}

function Row({ item, courseDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => courseDetailsHandler(item._id, item.title)}
            variant={"outline"}
            color="purple.500"
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={"purple.600"}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
