import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

// Component imports
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

// Color constants import
import colors from "../util/constants/colors";

const LoginScreen = () => {
  return (
    <LinearGradient
      colors={[colors.pink, colors.lightBlue]}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" && "padding"}
        >
          {/* wrapping Text tag below in plain View fixes choppy KeyboardAvoidingView movements on iOS */}
          <View>
            <Text style={styles.title}>Login</Text>
          </View>
          <CustomInput placeholder="Email" icon="person-outline" />
          <CustomInput placeholder="Password" icon="lock-closed-outline" />
          <CustomButton style={styles.button}>Login</CustomButton>

          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotPwdContainer}>
            <Text style={styles.text}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Create account */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={[styles.text, { color: colors.violet }]}>
                Sign up!
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
  },
  button: {
    marginTop: 30,
  },
  forgotPwdContainer: {
    marginTop: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  createAccountContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
});
