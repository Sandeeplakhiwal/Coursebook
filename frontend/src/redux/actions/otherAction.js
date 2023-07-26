import axios from "axios";
import { server } from "../store";

export const contact = (name, email, message) => async (dispatch) => {
  try {
    dispatch({ type: "contactRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      config
    );
    console.log(data);
    dispatch({ type: "contactSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "contactFailed", payload: error.response.data.message });
  }
};
