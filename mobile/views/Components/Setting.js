import { ListItem } from "@rneui/base";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
  ToastAndroid,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import LoginStore from "../../store/login";
import { useState } from "react";
function Setting({ navigation }) {
  const { setLogout } = LoginStore();
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure want to logout ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const res = await setLogout();
          if (res) {
            navigation.navigate("Login");
            ToastAndroid.showWithGravity(
              "Successfully Logout",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            console.log("result", res);
          }
        },
      },
    ]);
  };

  return (
    <View style={style.container}>
      <ListItem
        bottomDivider
        containerStyle={{ backgroundColor: "#EEEEEE", marginTop: 8 }}
        onPress={() => navigation.navigate("UserProfile")}
        Component={TouchableNativeFeedback}
      >
        <FontAwesome5 name="user-circle" size={24} color="black" />
        <ListItemContent>
          <ListItemTitle>
            <Text
              style={{
                fontFamily: "Poppins",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              User Profile
            </Text>
          </ListItemTitle>
        </ListItemContent>
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: "#EEEEEE", marginTop: 8 }}
        onPress={() => navigation.navigate("Password")}
        Component={TouchableNativeFeedback}
        bottomDivider
      >
        <Feather name="key" size={24} color="black" />
        <ListItemContent>
          <ListItemTitle>
            <Text
              style={{
                fontFamily: "Poppins",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              Change Password
            </Text>
          </ListItemTitle>
        </ListItemContent>
      </ListItem>
      <ListItem
        containerStyle={{ backgroundColor: "#EEEEEE", marginTop: 8 }}
        onPress={handleLogout}
        Component={TouchableNativeFeedback}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <ListItemContent>
          <ListItemTitle>
            <Text
              style={{
                fontFamily: "Poppins",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              Logout
            </Text>
          </ListItemTitle>
        </ListItemContent>
      </ListItem>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
});

export default Setting;
