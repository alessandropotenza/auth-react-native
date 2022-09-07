import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useContext, useEffect } from "react";

// Context import
import { AuthContext } from "../../context/AuthContext";

// Component imports
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

// Color constants import
import colors from "../../util/constants/colors";

const LoginScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formFilled, setFormFilled] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const emailInputHandler = (text) => setEmail(text);
  const passwordInputHandler = (text) => setPassword(text);

  useEffect(() => {
    if (email.length > 0 && password.length > 5) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [email, password]);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      await auth.login(email, password);
    } catch (err) {
      setIsLoading(false);
      if (err.response.status === 401) {
        // incorrect email or password
        Alert.alert(err.response.data.message);
      } else {
        Alert.alert("Could not log you in", "Please try again later");
      }
    }
  };

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
          <CustomButton
            style={styles.button}
            disabled={!formFilled}
            onPress={onLogin}
            isLoading={isLoading}
          >
            Login
          </CustomButton>

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
