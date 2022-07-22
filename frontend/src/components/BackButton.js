import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ children }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigation.goBack}
      hitSlop={25}
    >
      <Ionicon
        name={
          Platform.OS === "ios" ? "arrow-down-outline" : "arrow-back-outline"
        }
        size={20}
        color="white"
      />
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
