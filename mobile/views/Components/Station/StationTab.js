import { View, Text, ToastAndroid, Alert } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Record from "./Records";
import StationCamera from "./StationCamera";
import {
  Entypo,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { Button, Card } from "@rneui/base";
import { CardTitle } from "@rneui/base/dist/Card/Card.Title";
import LoginStore from "../../../store/login";
const HandleLogout = ({ navigation }) => {
  const { setLogout,loading } = LoginStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
      <Card>
        <CardTitle style={{ textAlign: "left", fontFamily: "Poppins" }}>
          <Text style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>
            Logout
          </Text>
        </CardTitle>
        <View>
          <Text style={{ fontFamily: "Poppins" }}>
            Are you sure to logout ?
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button
              type="clear"
              title="Cancel"
              titleStyle={{
                fontFamily: "Poppins",
                color: "gray",
                fontSize: 15,
              }}
              onPress={() => navigation.goBack()}
            ></Button>

            <Button
              type="clear"
              title="Yes"
              loading={loading}
              titleStyle={{
                fontFamily: "Poppins",
                color: "#141E61",
                fontSize: 15,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={async () => {
                const res = await setLogout();
                if (res) {
                  navigation.navigate("StationLogin");
                  ToastAndroid.showWithGravity(
                    "Successfully Logout",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                  console.log("result", res);
                }
              }}
            ></Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

const StationTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarActiveTintColor: "#141E61",
        tabBarInactiveTintColor: "gray",
      }}
      initialRouteName="StationCamera"
    >
      <Tab.Screen
        name="StationRecord"
        component={Record}
        options={{
          title: "Records",
          tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="book" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="StationCamera"
        component={StationCamera}
        options={{
          title: "Scan Face",
          tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="scan1" size={24} color={color} />
          ),
          unmountOnBlur:true
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="StationLogout"
        component={HandleLogout}
        options={{
          title: "Logout",
          tabBarLabelStyle: { fontFamily: "Poppins", fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="logout" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default StationTab;
