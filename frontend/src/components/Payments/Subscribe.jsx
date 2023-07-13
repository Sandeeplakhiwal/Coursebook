import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { buySubscription } from "../../redux/actions/userAction";
import axios from "axios";
import { server } from "../../redux/store.js";
import { toast } from "react-hot-toast";
import logo from "../../assets/images/barber-shop.png";

function Subscribe({ user }) {
  console.log(user);
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const { loading, subscriptionId, error } = useSelector(
    (state) => state.subscription
  );

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: "Coursebook",
          description: "Get Acccess To All Premium Content",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentvarification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "Coursebook online learning plateform",
          },
          theme: {
            color: "#FFC800",
          },
        };
        const razor = window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [dispatch, error, user.name, user.email, subscriptionId]);

  return (
    <Container h={"90vh"} p="16">
      <Heading children="Welcome" my={"8"} textAlign="center" />
      <VStack
        boxShadow={"lg"}
        alignItems="stretch"
        borderRadius={"lg"}
        spacing="0"
      >
        <Box bg={"yellow.400"} p="4" css={{ borderRadius: "8px 8px 0 0" }}>
          <Text children={`Pro Pack - ₹299.00`} color="black" />
        </Box>
        <Box p="4">
          <VStack textAlign={"center"} px="8" mt={"4"}>
            <Text children={"Join Pro Pack and get access to all content."} />
            <Heading size={"md"} children={`₹299 Only`} />
          </VStack>
          <Button
            onClick={() => subscribeHandler()}
            my={"8"}
            w="full"
            colorScheme={"yellow"}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg={"blackAlpha.600"} p="4" css={{ borderRadius: "0 0 8px 8px" }}>
          <Heading
            size={"sm"}
            children={`100% refund at cancellation`}
            color="white"
            textTransform={"uppercase"}
          />
          <Text
            fontSize={"xs"}
            color="white"
            children="Terms & Conditions apply."
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default Subscribe;
