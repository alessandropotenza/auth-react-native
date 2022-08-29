import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../util/constants/colors";

const CustomButton = ({ children, style, disabled }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        style,
        disabled && { backgroundColor: colors.washedViolet },
      ]}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 22.5,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.violet,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
