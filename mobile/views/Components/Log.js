import { Card, Skeleton } from "@rneui/base";
import moment from "moment";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import LogStore from "../../store/stationLogs";

function Log() {
  const [refreshing, setRefreshing] = useState(false);
  const { error, loading, data, setData } = LogStore();
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    LogStore.setState({ loading: true });
    try {
      await setData();
      await LogStore.setState({ loading: false });
      setRefreshing(false);
    } catch (error) {
      await LogStore.setState({ loading: false });
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setData();
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
          Station Logs
        </Text>

        <View style={{ marginTop: 15 }}>
          {data.length == 0 ? (
            <Card containerStyle={{ margin: 0, borderRadius: 8 }}>
              <Card.Title style={{ textAlign: "left", color: "black" }}>
                <Skeleton animation="pulse" width={220} height={40} />
              </Card.Title>
              <Card.Divider></Card.Divider>
              <View>
                <Skeleton
                  animation="pulse"
                  width={140}
                  height={20}
                  style={{ marginBottom: 4 }}
                />

                <Skeleton animation="pulse" width={140} height={20} />
              </View>
            </Card>
          ) : (
            data.map((loc) => {
              return (
                <Card containerStyle={{ margin: 0, borderRadius: 8,marginBottom:12 }} key={loc.id}>
                  <Card.Title style={{ textAlign: "left", color: "#141E61" }}>
                    <Text style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>
                      {loc.location?.name}
                    </Text>
                  </Card.Title>
                  <Card.Divider></Card.Divider>
                  <View>
                    <Text style={{ fontFamily: "Poppins",fontSize:14 }}>
                      {moment(loc.created_at).format("MMMM DD, YYYY").toString()}
                    </Text>
                    <Text style={{ fontFamily: "Poppins",fontSize:13,color:"gray" }}>
                      {moment(loc.created_at).format("hh:mm:ss a").toString()}
                    </Text>
                  </View>
                </Card>
              );
            })
          )}
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

export default Log;
