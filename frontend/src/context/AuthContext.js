import { createContext, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  const apiUrl = "http://10.0.0.182:8080";

  const signup = async (email, password) => {
    const response = await axios.post(apiUrl + "/signup", {
      email,
      password,
    });
    if (response.data.message === "Email already in use") {
      // user already exists
      return { conflict: true, message: response.data.message };
    }
    // user successfully created (status code 201)
    handleTokens(response.data);
    return { conflict: false };
  };

  const login = async (email, password) => {
    const response = await axios.post(apiUrl + "/login", {
      email,
      password,
    });
    handleTokens(response.data);
    console.log(response.data);
  };

  const handleTokens = async (responseData) => {
    const { accessToken, refreshToken, userID } = responseData; // destructure items from response

    // store tokens in an encrypted storage environment on the device
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    setTokens({
      accessToken,
      refreshToken,
    });
    setUser({ userID });
  };

  const refreshAccessToken = async () => {
    let refreshToken = tokens?.refreshToken; // get refresh token from state if it has already been retrieved
    if (!refreshToken) {
      //retrieve refresh token from memory if it exists
      refreshToken = await SecureStore.getItemAsync("refreshToken");
    }
    if (refreshToken) {
      const response = axios.post(apiUrl + "/refresh", {});
    }
  };

  const getAccessToken = async () => {
    return await SecureStore.getItemAsync("accessToken");
  };

  const value = {
    user,
    tokens,
    signup,
    login,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
