import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import HomeScreen from "../screens/authenticated/HomeScreen";

const Stack = createNativeStackNavigator();

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;
