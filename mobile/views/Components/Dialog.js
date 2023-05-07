import { Button, Card, CheckBox } from "@rneui/base";
import { CardTitle } from "@rneui/base/dist/Card/Card.Title";
import React, { useState,useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ToastAndroid,
} from "react-native";
import FollowUpStore from "../../store/followUp";
const Dialog = ({ dialog, closeModal }) => {
  const { loading, submitFollowUp,setData } = FollowUpStore();
  const [arr2, setArr2] = useState([
    { id: 1, status: false, title: "Fever(Lagnat)" },
    { id: 2, status: false, title: "Cough and/or Cold" },
    { id: 3, status: false, title: "Sore Throat" },
    { id: 4, status: false, title: "Body Pains" },
    { id: 5, status: false, title: "Loss of Taste" },
    { id: 6, status: false, title: "Loss of Smell" },
    { id: 7, status: false, title: "Vomiting" },
    { id: 8, status: false, title: "Difficulty of Breathing" },
    { id: 9, status: false, title: "No Symptoms" },
  ]);

  const submit = async () => {
    const list = [...arr2];
    const filtered = list.filter((f) => f.status == true);
    const map = filtered.map((m) => m.title);

    if (!map.length) {
      ToastAndroid.showWithGravity(
        "Please check atleast one answer.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return null;
    }

    const res = await submitFollowUp(map.join());
    if (res) {
      closeModal();
      const mapped = list.map((m) => {
        m.status = false;
        return m;
      });
      setArr2(mapped);
      ToastAndroid.showWithGravity(
        "Form Submitted Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  useEffect(() =>{
    setData()
  },[])
  return (
    <View style={[styles.centeredView, { backgroundColor: "red" }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialog}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View style={styles.centeredView}>
          <Card containerStyle={{ borderRadius: 8 }}>
            <CardTitle style={{ textAlign: "left" }}>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                  fontSize: 18,
                  color: "#141E61",
                }}
              >
                Follow Up
              </Text>
            </CardTitle>
            <View>
              <Text style={{ fontFamily: "Poppins", textAlign: "justify" }}>
                Are you experiencing one (1) or more of the follow symptoms? if
                not check{" "}
                <Text style={{ fontFamily: "PoppinsBold" }}>No Symptoms</Text>.
              </Text>
            </View>

            <View style={{ alignItems: "flex-start" }}>
              {arr2.map((val, index, arr) => {
                return (
                  <CheckBox
                    center={true}
                    containerStyle={{
                      marginBottom: 0,
                      paddingBottom: 2,
                      marginLeft: 0,
                      paddingLeft: 0,
                    }}
                    title={val.title}
                    key={index}
                    textStyle={{
                      fontFamily: "Poppins",
                      justifyContent: "center",
                    }}
                    fontFamily="Poppins"
                    checked={val.status}
                    onPress={() => {
                      const list = [...arr2];

                      const found = list.find((f) => {  
                        return f.id == val.id;
                      });

                      if (found.id != list[list.length - 1].id) {
                        found.status = !found.status;
                        setArr2(list);
                      }
                      if (list[list.length - 1].id == val.id) {
                        const data = list.map((last) => {
                          last.status =
                            last.id == list[list.length - 1].id
                              ? !last.status
                              : false;
                          return last;
                        });
                        setArr2(data);
                        console.log(data);
                      }
                    }}
                  />
                );
              })}
            </View>
            <View style={{ marginTop: 18 }}>
              <Button
                title="Submit"
                titleStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                }}
                buttonStyle={{ backgroundColor: "#141E61", borderRadius: 4 }}
                loading={loading}
                onPress={submit}
              ></Button>
              <Button
                title="Cancel"
                titleStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "gray",
                }}
                type="clear"
                containerStyle={{ marginBottom: 0, paddingBottom: 0 }}
                onPress={closeModal}
              ></Button>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.43)",
  },
  modalView: {
    margin: 12,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontFamily: "PoppinsBold",
  },
});

export default Dialog;
