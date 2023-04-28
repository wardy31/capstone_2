import { Avatar, CheckBox, ListItem } from "@rneui/base";
import { CardTitle } from "@rneui/base/dist/Card/Card.Title";
import { Button, Card } from "@rneui/themed";
import { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, ToastAndroid } from "react-native";
import FormStore from "../../store/form";
import SelectDropdown from "react-native-select-dropdown";
import UserStore from "../../store/user";
function Form() {
  const { setData, data, loading, setForm, checkForm, exists } = FormStore();
  const { userStatus } = UserStore();
  const [questionnaire, setQuestionnaire] = useState([]);
  const dropDownReset = useRef({});
  useEffect(() => {
    (async () => {
      await checkForm();
      await setData();
    })();
  }, []);

  const sub = (data) => {
    const split = data.split(",");
    return split;
  };

  const handleSubmit = async () => {
    if (questionnaire.length != data.length) {
      console.log(questionnaire.length + "w" + data.length);
      ToastAndroid.showWithGravity(
        "Please answer all questions.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return null;
    }
    const res = await setForm(questionnaire);

    if (res) {
      ToastAndroid.showWithGravity(
        "Submitted form successfully you can now enter the campus",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      await setQuestionnaire([]);
    }
  };

  const ans = [
    { text: "Yes", value: 1 },
    { text: "No", value: 0 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 22,
              color: "#141E61",
              marginBottom: 18,
            }}
          >
            Health Declaration Form
          </Text>
        </View>

        {userStatus?.user_patient?.length || userStatus?.user_tagged?.length ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "35%",
            }}
          >
            <Avatar size={135} source={require("../../assets/warning.png")} />
            <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>
              Cannot Access!
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                color: "gray",
                marginTop: -8,
              }}
            >
              the form was disable at the moment.
            </Text>
          </View>
        ) : !exists ? (
          <View>
          {data.length ? (
            data.map((quest, index) => {
              return (
                <Card
                  containerStyle={{ margin: 0, marginBottom: 12 }}
                  key={quest.id}
                >
                  <CardTitle style={{ textAlign: "justify" }}>
                    <Text style={{ fontFamily: "PoppinsBold", fontSize: 14 }}>
                      {quest.question}
                    </Text>
                  </CardTitle>

                  <View>
                    {quest?.sub_question &&
                      sub(quest?.sub_question).map((sub, index) => {
                        return (
                          <Text
                            style={{ fontFamily: "Poppins", fontSize: 12 }}
                            key={index}
                          >
                            * {sub}
                          </Text>
                        );
                      })}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: 16,
                    }}
                  >
                    <View style={{ marginLeft: 2, marginBottom: 12 }}>
                      <Text
                        style={{
                          marginBottom: 4,
                          fontFamily: "Poppins",
                          color: "#141E61",
                        }}
                      >
                        Select Answer
                      </Text>

                      <SelectDropdown
                        data={ans}
                        ref={dropDownReset}
                        defaultButtonText=" "
                        onSelect={(selectedItem) => {
                          const list = [...questionnaire];
                          const findList = list.find(
                            (f) => f.questionnaire_id == quest.id
                          );

                          if (findList) {
                            findList.answer = selectedItem.value;
                            setQuestionnaire(list);
                            return null;
                          }

                          setQuestionnaire([
                            ...questionnaire,
                            {
                              questionnaire_id: quest.id,
                              answer: selectedItem.value,
                            },
                          ]);
                          console.log("find", findList);
                        }}
                        buttonStyle={{
                          backgroundColor: "white",
                          width: 180,
                          borderWidth: 2,
                          height: 42,
                        }}
                        buttonTextStyle={{
                          fontFamily: "Poppins",
                          fontSize: 14,
                          color: "#141E61",
                          justifyContent: "flex-start",
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem.text;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item.text;
                        }}
                      />
                    </View>
                  </View>
                </Card>
              );
            })
          ) : null }
          {/* dd submit button */}
          {!exists && (
          <Button
            title="Submit Form"
            titleStyle={{
              fontFamily: "Poppins",
              fontSize: 14,
              paddingTop: 5,
              paddingBottom: 5,
            }}
            buttonStyle={{ backgroundColor: "#141E61", borderRadius: 4 }}
            loading={loading}
            loadingStyle={{ paddingTop: 5, paddingBottom: 5 }}
            onPress={handleSubmit}
          ></Button>
        )}
          </View>) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "35%",
            }}
          >
            <Avatar size={210} source={require("../../assets/check.png")} />
            <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>
              Form Submitted
            </Text>
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 13,
                color: "gray",
                marginTop: -8,
              }}
            >
              the form will reset for tomorrow
            </Text>
          </View>
        )}

       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
});

export default Form;
