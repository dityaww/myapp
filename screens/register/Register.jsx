import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, TouchableHighlight, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./register.style";
import { Link } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFailed,
  registerSuccess,
} from "../../redux/Auth/registerSlice";

const Register = () => {
  const [isFocused, SetIsFocused] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const selector = useSelector((state) => state.registration);

  const handleFocus = (id) => {
    SetIsFocused(id);
  };

  const handleRegistration = async () => {
    if (!email.trim() || !password.trim() || !name.trim()) {
      setErrorMessage("Please fill in all fields!");
    } else {
      const data = { name, email, password };
      axios
        .post("http://62.72.24.89:5000/auth/register", data)
        .then((response) => {
          dispatch(registerSuccess(response.data));
          setErrorMessage("");
          console.log(response.data);
        })
        .catch((error) => {
          dispatch(registerFailed(error.response.data));
          setErrorMessage(error.response.data.error);
          //   console.log(error.response.data);
        });
    }
  };

  useEffect(() => {
    if (selector.error !== false) {
      console.log("ada eror");
    }
  }, [selector]);

  console.log("selector:", selector);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1, backgroundColor: '#fff' }}
  >
      <SafeAreaView style={styles.container}>
        <View style={styles.fields}>
          <View style={styles.logo}>
            <Image
              source={require("../../assets/fix/regis.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.title}>Register your account</Text>

          {errorMessage ? (
            <Text style={{ color: "red", fontStyle: "italic" }}>
              *{errorMessage}
            </Text>
          ) : null}

          {/* USERNAME */}
          <View
            style={[
              styles.textInput,
              isFocused === "username" && styles.focusedTextInput,
            ]}
          >
            <TextInput
              placeholder={"masukkan username"}
              style={{ fontFamily: "regular", fontSize: 16 }}
              keyboardAppearance={"dark"}
              onFocus={() => handleFocus("username")}
              onBlur={() => handleFocus("")}
              value={name}
              onChangeText={(name) => setName(name)}
            />
          </View>

          {/* EMAIL */}
          <View
            style={[
              styles.textInput,
              isFocused === "email" && styles.focusedTextInput,
            ]}
          >
            <TextInput
              placeholder={"masukkan email"}
              style={{ fontFamily: "regular", fontSize: 16 }}
              keyboardAppearance={"dark"}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleFocus("")}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          {/* PASSWORD */}
          <View
            style={[
              styles.textInput,
              isFocused === "password" && styles.focusedTextInput,
            ]}
          >
            <TextInput
              placeholder={"masukkan password"}
              keyboardAppearance={"dark"}
              secureTextEntry={true}
              style={{ fontFamily: "regular", fontSize: 16 }}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleFocus("")}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          {/* <Text>
            {name} | {email} | {password}
          </Text> */}
        </View>
        <View style={styles.submit}>
          <TouchableHighlight
            onPress={handleRegistration}
            underlayColor="#818cf8"
            style={styles.btnSignIn}
          >
            <View>
              <Text style={{ color: "#fff", fontFamily: "bold" }}>Sign Up</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.link}>
            <Text style={{ fontFamily: "regular", fontSize: 15 }}>
              You have account?
            </Text>
            <Link
              to={{ screen: "Login" }}
              style={{ color: "#818cf8", fontFamily: "bold", fontSize: 15 }}
            >
              Let's Sign In
            </Link>
          </View>
        </View>
      </SafeAreaView>
  </KeyboardAvoidingView>
  );
};

export default Register;
