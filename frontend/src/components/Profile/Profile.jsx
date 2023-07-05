import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import programmingImg from "../../assets/images/programming.jpg";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileUploadCss } from "../Auth/Register";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);
  // const user = {
  //   name: "Sandeep Lakhiwal",
  //   email: "sandeeplakhiwal98@gmail.com",
  //   createdAt: String(new Date().toISOString()),
  //   role: "user",
  //   subscription: {
  //     status: "active",
  //   },
  //   playlist: [
  //     {
  //       course: "safgsar",
  //       poster: programmingImg,
  //     },
  //   ],
  // };

  const removeFromPlaylistHandler = (id) => {
    console.log(id);
  };

  const changeImageSubmitHandler = (e, image) => {
    e.preventDefault();
    console.log(image);
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Container minH={"95vh"} maxW="container.lg" py={"8"}>
      <Heading textAlign={"center"} textTransform={"uppercase"}>
        Profile
      </Heading>
      <Stack
        justifyContent={"flex-start"}
        direction={["column", "row"]}
        alignItems="center"
        spacing={["8", "16"]}
        padding="8"
      >
        <VStack>
          <Avatar boxSize={"48"} src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme={"yellow"} variant="ghost">
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
          <HStack>
            <Text noOfLines={1} children="Name" fontWeight={"bold"} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={"bold"} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={"bold"} />
            <Text children={user.createdAt.split("T")[0]} />
          </HStack>

          {user.role !== "admin" && (
            <HStack>
              <Text children="Subscription" fontWeight={"bold"} />
              {user.subscription && user.subscription.status === "active" ? (
                <Button color={"yellow.500"} variant="unstyled">
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={"/subscribe"}>
                  <Button colorScheme={"yellow"}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={["column", "row"]} alignItems={"center"}>
            <Link to={"/updateprofile"}>
              <Button>Update Profile</Button>
            </Link>
            <Link to={"/changepassword"}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Playlist" size={"md"} my="8" />

      {user.playlist && user.playlist.length == 1 ? (
        <Stack
          direction={["column", "row"]}
          alignItems="center"
          flexWrap={"wrap"}
          p="4"
        >
          {user.playlist.map((element, index) => {
            return (
              <VStack w={"48"} m="2" key={element.course}>
                <Image
                  boxSize={"full"}
                  objectFit="contain"
                  src={element.poster}
                />
                <HStack>
                  <Link to={`/course/${element.course}`}>
                    <Button colorScheme="yellow">Watch Now</Button>
                  </Link>
                  <Button
                    onClick={() => removeFromPlaylistHandler(element.course)}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            );
          })}
        </Stack>
      ) : (
        <Heading
          children="No Courses Available"
          fontSize={"md"}
          textAlign="center"
        />
      )}

      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
      />
    </Container>
  );
}

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    onClose();
    setImagePrev("");
    setImage("");
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalHeader children="Change Photo" />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                {imagePrev && <Avatar src={imagePrev} boxSize={["32", "48"]} />}
                <Input
                  type={"file"}
                  css={{ "&::file-selector-button": fileUploadCss }}
                  onChange={changeImage}
                />
                <Button
                  width={"full"}
                  colorScheme="yellow"
                  type="submit"
                  onClick={closeHandler}
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={"3"} onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
