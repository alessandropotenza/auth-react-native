import { NavigationContainer } from "@react-navigation/native";

// navigation stacks
import AuthenticatedStack from "./AuthenticatedStack";
import UnauthenticatedStack from "./UnauthenticatedStack";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* <AuthenticatedStack /> */}
      <UnauthenticatedStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
