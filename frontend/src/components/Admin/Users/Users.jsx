import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Sidebar from "../Sidebar";

function Users() {
  const users = [
    {
      _id: "eawrt",
      name: "Sandeep",
      email: "sandeeplakhiwal98@gmail.com",
      role: "admin",
      subscription: {
        status: "active",
      },
    },
    {
      _id: "evwrt",
      name: "Arpit",
      email: "sandeeplakhiwal98@gmail.com",
      role: "user",
      subscription: {
        status: "active",
      },
    },
    {
      _id: "ebwrt",
      name: "Shanku",
      email: "sandeeplakhiwal98@gmail.com",
      role: "user",
      subscription: {
        status: "active",
      },
    },
    {
      _id: "ecwrt",
      name: "Vikas",
      email: "sandeeplakhiwal98@gmail.com",
      role: "user",
      subscription: {
        status: "active",
      },
    },
  ];

  const updateHandler = (userId) => {
    console.log(userId, "updated");
  };
  const deleteButtonHandler = (userId) => {
    console.log(userId, "deleted");
  };

  return (
    <Grid
      css={{
        cursor: `default`,
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box p={["0", "16"]} overflowX="auto">
        <Heading
          textTransform={"uppercase"}
          my="16"
          textAlign={["center", "left"]}
          children="All Users"
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size="lg">
            <TableCaption>All available users in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Roll</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((item) => (
                <Row
                  key={item._id}
                  item={item}
                  updateHandler={updateHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  );
}

export default Users;

function Row({ item, updateHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status === "active" ? "Active" : "Not Active"}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={"outline"}
            color="purple.500"
          >
            Change Role
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
