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
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

// Component imports
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

// Color constants import
import colors from "../util/constants/colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputHandler = (text) => setEmail(text);
  const passwordInputHandler = (text) => setPassword(text);

  return (
    <LinearGradient
      colors={[colors.pink, colors.lightBlue]}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" && "padding"}
          keyboardVerticalOffset={-100}
        >
          {/* wrapping Text tag below in plain View fixes choppy KeyboardAvoidingView movements on iOS */}
          <View>
            <Text style={styles.title}>Log in</Text>
          </View>
          <CustomInput
            placeholder="Email"
            icon="person-outline"
            onChangeText={emailInputHandler}
            value={email}
          />
          <CustomInput
            placeholder="Password"
            icon="lock-closed-outline"
            onChangeText={passwordInputHandler}
            value={password}
            isSecure={true}
          />
          <CustomButton style={styles.button}>Login</CustomButton>

          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotPwdContainer}>
            <Text style={styles.text}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Create account */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              hitSlop={25}
            >
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
    fontSize: 35,
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
