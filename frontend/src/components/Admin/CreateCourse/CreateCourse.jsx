import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../redux/actions/adminAction";
import { fileUploadCss } from "../../Auth/Register";
import Sidebar from "../Sidebar";
import { toast } from "react-hot-toast";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const Categories = [
    "Web development",
    "Artificial Intelligence",
    "Data Structure & Algorithm",
    "App Development",
    "Data Science",
    "Game Development",
  ];
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const fileUploadStyle = {
    "&::file-selector-button": fileUploadCss,
  };

  const dispatch = useDispatch();

  // title, description, category, createdBy, file
  const submitHandler = (e) => {
    e.preventDefault();
    var myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", image);
    console.log("myForm", myForm);
    dispatch(createCourse(myForm));
  };

  const { loading, message, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, message, error]);

  return (
    <Grid
      css={{
        cursor: `default`,
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Container py={"16"}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={"uppercase"}
            my="16"
            textAlign={["center", "left"]}
          >
            Create Course
          </Heading>
          <VStack m={"auto"} spacing="8">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type={"text"}
              focusBorderColor="purple.300"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              type={"text"}
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={"text"}
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}>Category</option>
              {Categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              type={"file"}
              accept="image/"
              id="chooseCourse"
              focusBorderColor={"purple.300"}
              css={{
                "&::file-selector-button": {
                  ...fileUploadCss,
                  color: "purple",
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={"contain"} />
            )}
            <Button
              isLoading={loading}
              w={"full"}
              colorScheme="purple"
              type="submit"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
}

export default CreateCourse;
