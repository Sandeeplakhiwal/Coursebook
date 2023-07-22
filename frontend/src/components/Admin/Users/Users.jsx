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
import React, { useEffect } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateRole,
} from "../../../redux/actions/adminAction";
import { toast } from "react-hot-toast";

function Users() {
  var users = [
    {
      _id: "eawrt",
      name: "Sample",
      email: "Sample@gmail.com",
      role: "admin",
      subscription: {
        status: "active",
      },
    },
    {
      _id: "evwrt",
      name: "Sample",
      email: "sample2@gmail.com",
      role: "user",
      subscription: {
        status: "active",
      },
    },
  ];

  const updateHandler = (userId) => {
    console.log(userId, "updated");
    dispatch(updateRole(userId));
  };
  const deleteButtonHandler = (userId) => {
    console.log(userId, "deleted");
    dispatch(deleteUser(userId));
  };

  const dispatch = useDispatch();
  var { usersData, message, error, loading } = useSelector(
    (state) => state.admin
  );

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

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (usersData && usersData.numberOfUsers >= 1) {
    console.log(usersData);
    users = usersData.users;
  }

  if (usersData && usersData.numberOfUsers === 0) {
    toast.error("No Users Yet!");
  }

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
                  loading={loading}
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

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription !== undefined &&
        item.subscription.status === "active"
          ? "Active"
          : "Not Active"}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={"outline"}
            color="purple.500"
            isLoading={loading}
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
