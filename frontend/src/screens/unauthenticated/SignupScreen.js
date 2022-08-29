import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

// Component imports
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

// Color constants import
import colors from "../../util/constants/colors";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  const emailInputHandler = (text) => setEmail(text);
  const passwordInputHandler = (text) => setPassword(text);
  const confirmInputHandler = (text) => setConfirmPassword(text);

  // Close keyboard if it's open when sign up screen is navigated to
  // Prevents bugginess with swipe down animation
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (email.length > 0 && passwordsMatch) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [email, passwordsMatch]);

  useEffect(() => {
    if (password.length > 5 && password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

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
            <Text style={styles.title}>Sign up</Text>
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
          <CustomInput
            placeholder="Confirm Password"
            icon="checkmark-sharp"
            color={passwordsMatch && colors.lightGreen}
            onChangeText={confirmInputHandler}
            value={confirmPassword}
            isSecure={true}
          />
          <CustomButton style={styles.button} disabled={!formFilled}>
            Sign up
          </CustomButton>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default SignupScreen;

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
