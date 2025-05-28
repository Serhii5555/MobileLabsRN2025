import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL:
    "https://lab07-auth-app-default-rtdb.europe-west1.firebasedatabase.app/",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.params = { ...config.params, auth: token };
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
    }
    return Promise.reject(err);
  }
);

export default api;
