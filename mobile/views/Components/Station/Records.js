import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import RecordStore from "../../../store/records";
import { ListItem } from "@rneui/base";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { Entypo } from "@expo/vector-icons";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import moment from "moment";

const Records = () => {
  const { loading, error, setData, data } = RecordStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setData();
    console.log("hehe");
  }, []);

  const onRefresh = React.useCallback(async () => {
    const res = await setData();
    setRefreshing(true);

    if (res) {
      setRefreshing(false);
    }
  }, []);

  if (!data.length) {
    return null;
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={
          {
            // marginLeft: 20,
            // marginRight: 20,
            // paddingTop: 20,
            // paddingBottom: 20,
          }
        }
      >
        {data.map((m, index) => {
          return (
            <ListItem
              bottomDivider={data.length - 1 == index ? false : true}
              key={m.id}
            >
              <Entypo name="pin" size={19} color="#141E61" />
              <ListItemContent>
                <ListItemTitle>
                  <Text
                    style={{ fontFamily: "PoppinsBold", fontSize: 14 }}
                  >{`${m.user.firstName} ${m.user.middleName} ${m.user.lastName}`}</Text>
                </ListItemTitle>
                <ListItemSubtitle
                  style={{ fontFamily: "Poppins", fontSize: 12 }}
                >
                  {moment(m.created_at).format("MMMM DD, YYYY  h:mm a")}
                </ListItemSubtitle>
              </ListItemContent>
            </ListItem>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Records;
