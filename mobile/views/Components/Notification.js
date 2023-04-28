import { Card, ListItem } from "@rneui/base";
import moment from "moment";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  RefreshControl,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";

function Notification() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
        <Text style={[styles.textFont, { fontSize: 22, color: "#141E61" }]}>
          Notifications
        </Text>

        <View style={{ marginTop: 15 }}>
          <ListItem
            bottomDivider
            containerStyle={{ backgroundColor: "#EEEEEE", marginTop: 8 }}
            onPress={() => console.log("press")}
            Component={TouchableNativeFeedback}
          >
            <ListItemContent>
              <ListItemTitle>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  You have been in contact !
                </Text>
              </ListItemTitle>
              <ListItemSubtitle style={{ fontFamily: "Poppins", fontSize: 11 }}>
                {moment().format("MMM DD ,YYYY").toString()}
              </ListItemSubtitle>
            </ListItemContent>
          </ListItem>
          <ListItem
            bottomDivider
            containerStyle={{ backgroundColor: "#EEEEEE", marginTop: 8 }}
            onPress={() => console.log("press")}
            Component={TouchableNativeFeedback}
          >
            <ListItemContent>
              <ListItemTitle>
                <Text
                  style={{
                    fontFamily: "Poppins",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  The Form is now ready to fill up. 
                </Text>
              </ListItemTitle>
              <ListItemSubtitle style={{ fontFamily: "Poppins", fontSize: 11 }}>
                {moment().format("MMM DD ,YYYY").toString()}
              </ListItemSubtitle>
            </ListItemContent>
          </ListItem>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  textFont: {
    fontFamily: "PoppinsBold",
  },
});

export default Notification;
