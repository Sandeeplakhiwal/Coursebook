import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailed", payload: error.response.data.message });
  }
};

export const signup = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "registerFailed", payload: error.response.data.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: "logoutSuccess", payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: "logoutFailed", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "loadUserFailed", payload: error.response.data.message });
  }
};

export const addToPlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: "addToPlaylistRequest" });
    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "addToPlaylistSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "addToPlaylistFailed",
      payload: error.response.data.message,
    });
  }
};
export const removeFromPlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: "removeFromPlaylistRequest" });
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`,
      config
    );
    dispatch({ type: "removeFromPlaylistSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "removeFromPlaylistFailed",
      payload: error.response.data.message,
    });
  }
};

export const buySubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "buySubscriptionRequest" });
    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });
    dispatch({ type: "buySubscriptionSuccess", payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: "buySubscriptionFailed",
      payload: error.response.data.message,
    });
  }
};

export const cancelSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "cancelSubscriptionRequest" });
    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });
    dispatch({
      type: "cancelSubscriptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "cancelSubscriptionFailed",
      payload: error.response.data.message,
    });
  }
};
