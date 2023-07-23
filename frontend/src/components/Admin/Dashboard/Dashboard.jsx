import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../../redux/actions/adminAction";
import Loader from "../../Layout/Loader/Loader";
import Sidebar from "../Sidebar";
import { DoughnutChart, LineChart } from "./Chart";

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={["full", "20%"]}
    boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
    p="8"
    borderRadius={"lg"}
  >
    <Text children={title} />
    <HStack spacing={"6"}>
      <Text fontSize={"2xl"} fontWeight="bold" children={qty} />
      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text children="Since Last Month" opacity={0.6} />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py={"4"} px={["0", "20"]}>
    <Heading size={"sm"} mb="2">
      {title}
    </Heading>
    <HStack w={"full"} alignItems="center">
      <Text children={profit ? "0%" : `-${value}%`} />
      <Progress w={"full"} value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

function Dashboard() {
  const dispatch = useDispatch();

  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    usersPercentage,
    subscriptionPercentage,
    viewsPercentage,
    usersProfit,
    subscriptionProfit,
    viewsProfit,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid
      css={{
        cursor: `default`,
      }}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      {loading ? (
        <Loader />
      ) : (
        <Box boxSizing="border-box" py={"16"} px={["4", "0"]}>
          <Text
            textAlign={"center"}
            opacity={0.5}
            children={`Last change was on ${
              String(new Date(stats && stats[11].createdAt)).split("G")[0]
            }`}
          />
          <Heading
            children="Dashboard"
            ml={["0", "16"]}
            mb="16"
            textAlign={["center", "left"]}
          />
          <Stack
            direction={["column", "row"]}
            minH="24"
            justifyContent={"space-evenly"}
          >
            <Databox
              title="Views"
              qty={viewsCount ? viewsCount : 0}
              qtyPercentage={viewsPercentage ? viewsPercentage : 0}
              profit={viewsProfit ? viewsProfit : false}
            />
            <Databox
              title="Users"
              qty={usersCount ? usersCount : 0}
              qtyPercentage={usersPercentage ? usersPercentage : 0}
              profit={usersProfit ? usersProfit : false}
            />
            <Databox
              title="Subscription"
              qty={subscriptionCount ? subscriptionCount : 0}
              qtyPercentage={
                subscriptionPercentage ? subscriptionPercentage : 0
              }
              profit={subscriptionProfit ? subscriptionProfit : false}
            />
          </Stack>

          <Box
            m={["0", "16"]}
            borderRadius="lg"
            padding={["0", "16"]}
            mt={["4", "16"]}
            boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"}
          >
            <Heading
              textAlign={["center", "left"]}
              size="md"
              children={"Views Graph"}
              pt={["8", "0"]}
              ml={["0", "16"]}
            />
            {/* Line Graph Here */}
            <LineChart views={stats && stats.map((item) => item.views)} />
          </Box>
          <Grid templateColumns={["1fr", "2fr 1fr"]}>
            <Box p={"4"}>
              <Heading
                textAlign={["center", "left"]}
                size="md"
                my={"8"}
                ml={["0", "16"]}
              >
                Progress Bar
              </Heading>
              <Box>
                <Bar
                  profit={viewsProfit ? viewsProfit : false}
                  title="Views"
                  value={viewsPercentage ? viewsPercentage : 0}
                />
                <Bar
                  profit={usersProfit ? usersProfit : false}
                  title="Users"
                  value={usersPercentage ? usersPercentage : 0}
                />
                <Bar
                  profit={subscriptionProfit ? subscriptionProfit : false}
                  title="Subscription"
                  value={subscriptionPercentage ? subscriptionPercentage : 0}
                />
              </Box>
            </Box>
            <Box padding={["0", "16"]} boxSizing="border-box" py={"4"}>
              <Heading textAlign={"center"} size="md" children="Users" />
              {/* Doughnut Graph */}
              <DoughnutChart
                theData={[subscriptionCount, usersCount - subscriptionCount]}
              />
            </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
}

export default Dashboard;
