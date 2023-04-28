import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import Login from "./views/Login";
import StationLogin from "./views/Components/StationLogin";
import Navigation from "./views/Navigations";
import CreateAccount from "./views/Components/CreateAccount";
import StationTab from "./views/Components/Station/StationTab";
// Settings
import UserProfile from "./views/Components/UserProfile";
import Password from "./views/Components/Password";
import Cameras from "./views/Components/Camera";
import Alert from "./views/Components/Station/Alert";


SplashScreen.preventAutoHideAsync()
export default function App()  {
  const [type, setType] = useState(true); //Pag change hin type user or stations
  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={type ? "Login" : "StationLogin"}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="StationLogin"
            component={StationLogin}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerTitle: "UniTrace.",
              headerBackVisible: false,
              headerTitleStyle: { color: "#FFFF", fontFamily: "Poppins" },
              headerStyle: { backgroundColor: "#141E61" },
            }}
            name="Navigation"
            component={Navigation}
          ></Stack.Screen>

          <Stack.Screen
            options={{
              headerTitle: "UniTrace.",
              headerBackVisible: false,
              headerTitleStyle: { color: "#FFFF", fontFamily: "Poppins" },
              headerStyle: { backgroundColor: "#141E61" },
            }}
            name="StationTab"
            component={StationTab}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerTitle: "Create Account",
              headerTintColor: "white",
              headerTitleStyle: { color: "#FFFF", fontFamily: "Poppins" },
              headerStyle: { backgroundColor: "#141E61" },
            }}
            name="CreateAccount"
            component={CreateAccount}
          ></Stack.Screen>

          <Stack.Screen
            options={{
              headerTitle: "User Profile",
              headerTintColor: "white",
              headerTitleStyle: { color: "#FFFF", fontFamily: "Poppins" },
              headerStyle: { backgroundColor: "#141E61" },
            }}
            name="UserProfile"
            component={UserProfile}
          ></Stack.Screen>

          <Stack.Screen
            options={{
              headerTitle: "Change Password",
              headerTintColor: "white",
              headerTitleStyle: { color: "#FFFF", fontFamily: "Poppins" },
              headerStyle: { backgroundColor: "#141E61" },
            }}
            name="Password"
            component={Password}
          ></Stack.Screen>
          <Stack.Screen name="Alert" component={Alert} options={{presentation:"transparentModal"}}></Stack.Screen>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Camera",
              headerStyle: { backgroundColor: "#141E61" },
              headerTintColor: "white",
              headerTitleStyle: { color: "#FFFF", fontFamily: "Poppins" },
            }}
          >
            <Stack.Screen name="Cameras" component={Cameras}></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
