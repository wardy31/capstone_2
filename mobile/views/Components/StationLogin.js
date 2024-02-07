import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import { Input, Button, ListItem } from "@rneui/themed";
import { useState, useEffect } from "react";
import LoginStore from "../../store/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
function Login({ navigation }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setLogin, error, loading, setUser, authCheck, setStation } =
    LoginStore();
  const [auth, setAuth] = useState(false);

  const validateError = (label) => {
    const findLabel = error.find((f) => label == f.path[0]);

    return findLabel ?? false;
  };
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (token != null) {
        await setAuth(true);
        await setUser();
        await navigation.navigate("StationTab");
        SplashScreen.hideAsync();
        console.log(true);
      } else {
        setAuth(false);
        console.log(false);
      }
      SplashScreen.hideAsync();
    })();
  }, [authCheck]);

  const handleLogin = async () => {
    const res = await setStation(form);
    console.log("res", res);

    if (res) {
      navigation.navigate("StationTab");
      setForm({ ...form, username: "", password: "" });
      ToastAndroid.showWithGravity(
        "Successfully Logged In",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };
  return (
    <View style={style.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 28,
          paddingRight: 28,
          // backgroundColor: "#EEEEEE",
          borderTopStartRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <Text style={[style.logo, { marginBottom: 80 }]}>UniTrace.</Text>
        <Text
          style={{
            fontFamily: "PoppinsBold",
            fontSize: 17,
            color: "#141E61",
            paddingBottom: 12,
          }}
        >
          Login Station
        </Text>

        <Input
          placeholder="Enter Username"
          placeholderTextColor="#CCCCCC"
          leftIcon={<FontAwesome5 name="user" size={19} color="#141E61" />}
          inputContainerStyle={{
            backgroundColor: "#EEEEEE",
            borderBottomWidth: validateError("username")?.message ? 2 : 2,
            height: 52,
            paddingLeft: 16,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: validateError("username")?.message ? "red" : "gray",
          }}
          inputStyle={{
            fontFamily: "Poppins",
            fontSize: 14,
            marginLeft: 4,
            marginTop: 5,
          }}
          containerStyle={{
            borderRadius: 5,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingStart: 0,
          }}
          value={form.username}
          onChangeText={(val) => setForm({ ...form, username: val })}
          errorStyle={{
            marginBottom: validateError("username")?.message ? 24 : 0,
          }}
          errorMessage={validateError("username")?.message}
        />

        <Input
          placeholder="Enter Password"
          placeholderTextColor="#CCCCCC"
          leftIcon={<Foundation name="key" size={19} color="#141E61" />}
          inputContainerStyle={{
            backgroundColor: "#EEEEEE",
            height: 52,
            paddingLeft: 16,
            borderWidth: 2,
            borderRadius: 5,
            borderBottomWidth: validateError("password")?.message ? 2 : 2,
            borderColor: validateError("password")?.message ? "red" : "gray",
          }}
          containerStyle={{
            borderRadius: 5,
            marginTop: -10,
            marginBottom: -1,
            paddingLeft: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingStart: 0,
          }}
          inputStyle={{
            fontFamily: "Poppins",
            fontSize: 14,
            paddingBottom: 0,
            marginLeft: 4,
          }}
          secureTextEntry={true}
          value={form.password}
          onChangeText={(val) => setForm({ ...form, password: val })}
          errorStyle={{ marginBottom: validateError("password")?.message ? 18 : 0 }}
          errorMessage={validateError("password")?.message}
        />

        <Button
          onPress={handleLogin}
          loading={loading}
          buttonStyle={{
            borderRadius: 5,
            padding: 10,
            backgroundColor: "#141E61",
          }}
          titleStyle={{ color: "white", fontSize: 15, fontFamily: "Poppins" }}
        >
          Login
        </Button>
        {/* <Button
            title="Create Account"
            type="clear"
            TouchableComponent={TouchableWithoutFeedback}
            containerStyle={{ backgroundColor: "white",paddingTop:12 }}
            titleStyle={{ fontFamily: "Poppins", fontSize: 14, color: "#141E61" }}
            onPress={() => navigation.navigate("CreateAccount")}
          ></Button> */}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    fontFamily: "PoppinsBold",
    color: "#141E61",
    fontSize: 38,
    textAlign: "center",
  },
});
export default Login;
