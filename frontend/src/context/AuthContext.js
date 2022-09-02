import { createContext, useState } from "react";
import { Alert } from "react-native";
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
    if (response.status === 200) {
      // user already exists
      return { conflict: true, message: response.data.message };
    }
    // user successfully created (status code 201)
    const { accessToken, refreshToken, userID } = response.data; // destructure data from response
    await SecureStore.setItemAsync(
      "tokens",
      JSON.stringify({ accessToken, refreshToken })
    );
    setTokens({
      accessToken,
      refreshToken,
    });
    setUser({ userID });
    return { conflict: false };
  };

  const value = { user, tokens, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
