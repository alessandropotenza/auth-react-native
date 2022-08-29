import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import LoginScreen from "../screens/unauthenticated/LoginScreen";
import SignupScreen from "../screens/unauthenticated/SignupScreen";

// Component imports
import BackButton from "../components/BackButton";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ gestureDirection: "vertical" }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => <BackButton>Back to Log in</BackButton>,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
