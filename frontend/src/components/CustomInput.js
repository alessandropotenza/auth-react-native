import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import Ionicon from "react-native-vector-icons/Ionicons";

const CustomInput = ({
  placeholder,
  icon,
  color,
  onChangeText,
  value,
  isSecure,
}) => {
  return (
    // shadow container used to cascade shadow to child as long as no background color set
    // because can't use overflow:"hidden" on child without clipping shadow
    <View style={styles.shadowContainer}>
      <View style={styles.inputContainer}>
        <Ionicon
          style={styles.icon}
          name={icon}
          size={17}
          color={color ? color : "black"}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          value={value}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  shadowContainer: {
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputContainer: {
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 22.5,
    height: 45,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 15,
  },
  icon: {
    marginLeft: 15,
  },
});
