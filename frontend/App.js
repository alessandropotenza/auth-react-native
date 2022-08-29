import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
};

export default App;
