import AppNavigator from "./src/navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";

// context import
import AuthContextProvider from "./src/context/AuthContext";

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <AppNavigator />
      </AuthContextProvider>
    </>
  );
};

export default App;
