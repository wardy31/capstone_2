import { Text } from "react-native";
import { Tab, TabView, Badge } from "@rneui/themed";
import { useState,useEffect} from "react";
import {
  FontAwesome,
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./Components/Home";
import Form from "./Components/Form";
import Log from "./Components/Log";
import Notification from "./Components/Notification";
import Setting from "./Components/Setting";
import LoginStore from '../store/login'
import AsyncStorage from "@react-native-async-storage/async-storage";
function Navigations({navigation}) {
  const [index, setIndex] = useState(0);
  const {setUser} = LoginStore()
  const Tab = createMaterialTopTabNavigator();

  // useEffect(() =>{
  //   (async () =>{
  //     const token = await AsyncStorage.getItem('token')
  //     if(token !== null){
  //       setUser()
  //     }
  //     else{
  //       navigation.navigate('Login')
  //     }
  //   })()
  // },[])
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#141E61",
        tabBarInactiveTintColor: "#141E61", 
        tabBarPressOpacity:1,
        tabBarPressColor:"transparent",
        tabBarStyle: { backgroundColor: "#D9D9D9" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Form") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Log") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "md-menu" : "md-menu-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "#141E61",
          height: 2,
          borderRadius: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Form" component={Form}></Tab.Screen>
      <Tab.Screen name="Log" component={Log}></Tab.Screen>
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarBadge: () => {
            const check = true;
            return check ? (
              <Badge
                status="secondary"
                badgeStyle={{ width: 9, height: 9 }}
                containerStyle={{ marginTop: 10, marginRight: 10 }}
              />
            ) : null;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen name="Setting" component={Setting}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Navigations;
