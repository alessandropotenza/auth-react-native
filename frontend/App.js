import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./src/screens/MainNavigator";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <MainNavigator />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
