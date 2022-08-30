import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

// navigation stacks
import UnauthenticatedStack from "./UnauthenticatedStack";
import AuthenticatedStack from "./AuthenticatedStack";

// context import
import { AuthContext } from "../context/AuthContext";

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
