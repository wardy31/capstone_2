import { Button, Card } from "@rneui/base";
import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import LoginStore from "../../store/login";
import FormStore from "../../store/form";
import UserStore from "../../store/user";
import { ListItem } from "@rneui/themed";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { FontAwesome } from "@expo/vector-icons";
import Dialog from "./Dialog";
import FollowUpStore from "../../store/followUp";

function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = LoginStore();
  const { exists: followUpExist } = FollowUpStore();
  const { setCheckStatus, userStatus } = UserStore();
  const { exists } = FormStore();

  // Dialog
  const [dialog, setDialog] = useState(false);

  const daysLeft = () => {
    return (
      <Text style={{ fontFamily: "PoppinsBold", color: "#141E61" }}>
        {userStatus?.user_patient?.length
          ? userStatus?.user_patient[0]?.days_left
          : userStatus?.user_tagged[0]?.days_left}
      </Text>
    );
  };

  const openModal = () => {
    setDialog(true);
  };

  const closeModal = () => {
    setDialog(false);
  };
  useEffect(() => {
    (async () => {
      await setCheckStatus();
    })();
  }, []);

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
      <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
        <View style={{ paddingTop: 20 }}>
          <Text style={[styles.textFont, { color: "#787A91", fontSize: 20 }]}>
            Welcome ,
          </Text>
          <Text style={[styles.textFont, { color: "#141E61", fontSize: 20,textTransform:"capitalize" }]}>
            {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Card containerStyle={{ borderRadius: 5, margin: 0 }}>
            <Card.Title style={{ textAlign: "left" }}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  color: "#141E61",
                  fontSize: 16
                }}
              >
                Contact Status
              </Text>
            </Card.Title>
            <View style={{ padding: 16 }}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  fontSize: 24,
                  color: "#787A91",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {userStatus?.user_patient.length ||
                userStatus?.user_tagged.length ? (
                  userStatus?.user_patient.length ? (
                    userStatus?.user_patient[0]?.contact_category.category
                  ) : (
                    userStatus?.user_tagged[0]?.contact_category.category
                  )
                ) : (
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      fontSize: 24,
                      color: "teal",
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    Good
                  </Text>
                )}
              </Text>
            </View>
          </Card>

          {/* <Card containerStyle={{ borderRadius: 5, margin: 0, marginTop: 12 }}>
            <Card.Title style={{ textAlign: "left" }}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  color: "#141E61",
                  fontSize: 16,
                }}
              >
                Close Contact Exposure
              </Text>
            </Card.Title>
            <View style={{ margin: 12 }}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  fontSize: 19,
                  color: "#787A91",
                  textAlign: "center",
                }}
              >
                3
              </Text>
            </View>
          </Card> */}
        </View>
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              color: "#141E61",
              fontSize: 18,
            }}
          >
            Daily Announcements
          </Text>

          <View style={{ marginTop: 10 }}>
            <Dialog dialog={dialog} closeModal={closeModal} />
            {userStatus?.user_patient.length ||
            userStatus?.user_tagged.length ? (
              followUpExist ? (
                <ListItem containerStyle={{ borderRadius: 8, marginTop: 12 }}>
                  <FontAwesome name="check-circle" size={28} color="#141E61" />
                  <ListItemContent>
                    <Text
                      style={{ fontFamily: "Poppins", textAlign: "justify" }}
                    >
                      The{" "}
                      <Text
                        style={{ fontFamily: "PoppinsBold", color: "#141E61" }}
                      >
                       Daily Follow Up
                      </Text>{" "}
                      was submitted. please comeback for tomorrow's follow up of your health status.
                    </Text>
                  </ListItemContent>
                </ListItem>
              ) : (
                <Card containerStyle={{ borderRadius: 5, margin: 0 }}>
                  <Card.Title style={{ textAlign: "left" }}>
                    <Text
                      style={{
                        fontFamily: "PoppinsBold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Check In Daily
                    </Text>
                  </Card.Title>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 14,
                        color: "#787A91",
                        textAlign: "justify",
                      }}
                    >
                      Good Day, you have {daysLeft()} days left to self
                      quarantine. please follow up daily to monitor your if/has
                      symptoms.
                    </Text>
                    <Button
                      title="Follow Up"
                      type="outline"
                      size="sm"
                      containerStyle={{ marginTop: 12 }}
                      buttonStyle={{
                        width: 110,
                        borderRadius: 8,
                        borderColor: "#141E61",
                        backgroundColor: "#141E61",
                      }}
                      titleStyle={{
                        color: "white",
                        fontSize: 13,
                        fontFamily: "Poppins",
                      }}
                      onPress={() => openModal()}
                    />
                  </View>
                </Card>
              )
            ) : !exists ? (
              <Card
                containerStyle={{ borderRadius: 5, margin: 0, marginTop: 10 }}
              >
                <Card.Title style={{ textAlign: "left" }}>
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      color: "black",
                      fontSize: 16,
                    }}
                  >
                    Health Declaration Form
                  </Text>
                </Card.Title>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 14,
                      color: "#787A91",
                      textAlign: "justify",
                    }}
                  >
                    Fill up your health declaration form when entering the
                    campus (REQUIRED).
                  </Text>
                  <Button
                    title="Fill Up Form"
                    type="outline"
                    size="sm"
                    containerStyle={{ marginTop: 12 }}
                    buttonStyle={{
                      width: 110,
                      borderRadius: 8,
                      borderColor: "#141E61",
                      backgroundColor: "#141E61",
                    }}
                    titleStyle={{
                      color: "white",
                      fontSize: 13,
                      fontFamily: "Poppins",
                    }}
                    onPress={() => navigation.navigate("Form")}
                  />
                </View>
              </Card>
            ) : (
              <ListItem containerStyle={{ borderRadius: 8, marginTop: 12 }}>
                <FontAwesome name="check-circle" size={28} color="#141E61" />
                <ListItemContent>
                  <Text style={{ fontFamily: "Poppins", textAlign: "justify" }}>
                    The{" "}
                    <Text
                      style={{ fontFamily: "PoppinsBold", color: "#141E61" }}
                    >
                      Health Declaration Form
                    </Text>{" "}
                    was submitted. You can now enter the campus, have a nice day
                    and keep safe.
                  </Text>
                </ListItemContent>
              </ListItem>
            )}
          </View>
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

export default Home;
