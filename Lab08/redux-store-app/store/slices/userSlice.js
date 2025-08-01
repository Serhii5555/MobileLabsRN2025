import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage/";

const userSlice = createSlice({
  name: "user",
  initialState: {
    idToken: null,
    localId: null,
    email: null,
    name: null,
  },
  reducers: {
    login(state, action) {
      const { name, idToken, localId, email } = action.payload;
      state.idToken = idToken;
      state.localId = localId;
      state.email = email;
      state.name = name;
    },
    logout(state) {
      state.idToken = null;
      state.localId = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

const API_KEY = "AIzaSyDRABaGZmOFqGO4CyYABCbJkXsBnTG9aGs";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await api.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, localId } = response.data;
    await AsyncStorage.setItem("userToken", idToken);

    const userSnapshot = await api.get(`/users/${localId}.json`);

    const userData = userSnapshot.data || {};
    const name = userData.name || "";

    dispatch(login({ name, idToken, localId, email }));
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
export const registerUser = (email, password, name) => async (dispatch) => {
  try {
    const res = await api.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      { email, password, returnSecureToken: true }
    );

    const { localId, idToken } = res.data;

    await AsyncStorage.setItem("userToken", idToken);

    await api.put(`/users/${localId}.json`, { email, name });

    dispatch(login({ name, idToken, localId, email }));
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("userToken");
    dispatch(logout());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default userSlice.reducer;
