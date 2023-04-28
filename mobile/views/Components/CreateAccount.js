import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TextInput,
  ToastAndroid,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Input } from "@rneui/themed";
import { Avatar, Button, Divider, ListItem, Dialog } from "@rneui/base";
import { Tab, TabView } from "@rneui/themed";
import {
  FontAwesome5,
  Entypo,
  Feather,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { DialogTitle } from "@rneui/base/dist/Dialog/Dialog.Title";
import { Camera, CameraType } from "expo-camera";
import BaseStore from "../../store/base64";
import RegisterStore from "../../store/createAccount";

// import * as ImagePicker from "expo-image-picker";

function CreateAccount({ route, navigation }) {
  const [index, setIndex] = useState(0);
  const { upload1, upload2, setClean } = BaseStore();
  const { setSubmit, loading, error } = RegisterStore();
  const [forms, setForm] = useState({
    first_name: "",
    middle_name: "",
    suffix_name: "",
    last_name: "",
    gender: "",
    address: "",
    email: "",
    department: "",
    contact_number: "",
    classification_id: "",
    vaccination_status: "",
    username: "",
    upload1: "",
    upload2: "",
    password_confirmation: "",
    password: "",
  });

  const gender = [
    { id: 1, value: "Male" },
    { id: 2, value: "Female" },
  ];

  const classification = [
    { id: 1, value: "Student" },
    { id: 2, value: "Employee" },
    { id: 3, value: "Visitor" },
  ];

  const vaccinationStatus = [
    { id: 1, value: "Partially Vaccinated" },
    { id: 2, value: "Fully Vacinated" },
    { id: 3, value: "Booster" },
  ];
  useEffect(() => {
    setForm({ ...forms, upload1: upload1, upload2: upload2 });
    console.log("up1", upload1);
    console.log("up2", upload2);
  }, [upload1, upload2]);

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("first_name", forms.first_name);
    form.append("middle_name", forms.middle_name);
    form.append("last_name", forms.last_name);
    form.append("gender", forms.gender);
    form.append("address", forms.address);
    form.append("email", forms.email);
    form.append("department", forms.department);
    form.append("contact_number", forms.contact_number);
    form.append("classification_id", forms.classification_id);
    form.append("vaccination_status", forms.vaccination_status);
    form.append("username", forms.username);
    form.append("password", forms.password);
    form.append("password_confirmation", forms.password_confirmation);
    form.append(
      "upload_1",
      forms.upload1
        ? {
            name: "upload1.jpg",
            type: "image/jpg",
            uri: forms.upload1.uri,
          }
        : ""
    );
    form.append(
      "upload_2",
      forms.upload2
        ? {
            name: "upload2.jpg",
            type: "image/jpg",
            uri: forms.upload2.uri,
          }
        : ""
    );

    const res = await setSubmit(form);
    if (res) {
      setForm({
        ...forms,
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        address: "",
        email: "",
        department: "",
        contact_number: "",
        classification_id: "",
        vaccination_status: "",
        username: "",
        password: "",
        password_confirmation: "",
        upload1: "",
        upload2: "",
      });
      setClean();
      setIndex(0);
      navigation.navigate("Login");
      ToastAndroid.showWithGravity(
        "You are successfully registered",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };


  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "#141E61",
          height: 3,
          borderRadius: 8,
        }}
      >
        <Tab.Item
          title="Info"
          titleStyle={{ fontSize: 12, fontFamily: "Poppins", color: "#141E61" }}
          icon={<FontAwesome5 name="info" size={19} color="#141E61" />}
        />
        <Tab.Item
          title="Image"
          titleStyle={{ fontSize: 12, fontFamily: "Poppins", color: "#141E61" }}
          icon={<Entypo name="camera" size={19} color="#141E61" />}
        />

        <Tab.Item
          title="Password"
          titleStyle={{ fontSize: 12, fontFamily: "Poppins", color: "#141E61" }}
          icon={<Feather name="key" size={19} color="#141E61" />}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <ScrollView style={{ flex: 1, backgroundColor: "#EEEEE" }}>
            <View style={{ marginLeft: 8, marginRight: 8, marginTop: 8 }}>
              <Input
                name="first_name"
                label="First Name"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter First Name"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                  borderColor: error.first_name ? "red" : "black",
                  borderWidth: error.first_name ? 2 : 0,
                }}
                containerStyle={{
                  marginTop: 22,
                  marginBottom: -12,
                }}
                value={forms.first_name}
                onChangeText={(val) => {
                  const nonNumericRegex = /^[a-zA-Z\s]*$/;
                  if (!nonNumericRegex.test(val)) {
                    return ;
                  }
                  setForm({ ...forms, first_name: val })
                   
                }}
                errorMessage={error.first_name}
                errorStyle={{ marginBottom: 22 }}
                inputMode="text"
                autoCapitalize="words"
              />
              <Input
                label="Middle Name"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter Middle Name"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                  borderColor: error.middle_name ? "red" : "black",
                  borderWidth: error.middle_name ? 2 : 0,
                }}
                containerStyle={{ marginBottom: -12 }}
                value={forms.middle_name}
                onChangeText={(val) => {
                  const nonNumericRegex = /^[a-zA-Z\s]*$/;
                  if (!nonNumericRegex.test(val)) {
                    return ;
                  }
                  setForm({ ...forms, middle_name: val })
                   
                }}
                errorMessage={error.middle_name}
                errorStyle={{ marginBottom: 22 }}
              />

              <Input
                label="Last Name"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter Last Name"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                  borderColor: error.last_name ? "red" : "black",
                  borderWidth: error.last_name ? 2 : 0,
                }}
                containerStyle={{ marginBottom: -12 }}
                value={forms.last_name}
                onChangeText={(val) => {
                  const nonNumericRegex = /^[a-zA-Z\s]*$/;
                  if (!nonNumericRegex.test(val)) {
                    return ;
                  }
                  setForm({ ...forms, last_name: val })
                   
                }}
                errorMessage={error.last_name}
                errorStyle={{ marginBottom: 22 }}
              />

              <View
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 12 }}
              >
                <Text
                  style={{
                    marginBottom: 8,
                    fontFamily: "Poppins",
                    color: "#141E61",
                  }}
                >
                  Gender
                </Text>
                <SelectDropdown
                  data={gender}
                  defaultButtonText="Select Gender"
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem.id);
                    setForm({ ...forms, gender: selectedItem.id });
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    borderColor: error.gender ? "red" : "black",
                    borderWidth: error.gender ? 2 : 0,
                    borderBottomWidth: error.gender ? 2 : 1,
                    width: "100%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins",
                    fontSize: 14,
                    color: "#141E61",
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.value;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.value;
                  }}
                />
                {error.gender && (
                  <Text style={{ marginTop: 3, color: "red", fontSize: 12 }}>
                    {error.gender}
                  </Text>
                )}
              </View>
              <View
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 12 }}
              >
                <Text
                  style={{
                    marginBottom: 8,
                    fontFamily: "Poppins",
                    color: "#141E61",
                  }}
                >
                  Classification
                </Text>

                <SelectDropdown
                  data={classification}
                  defaultButtonText="Select Classification"
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem.id);
                    setForm({ ...forms, classification_id: selectedItem.id });
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    borderColor: error.classification_id ? "red" : "black",
                    borderWidth: error.classification_id ? 2 : 0,
                    borderBottomWidth: error.classification_id ? 2 : 1,
                    width: "100%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins",
                    fontSize: 14,
                    color: "#141E61",
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.value;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.value;
                  }}
                />
                {error.classification_id && (
                  <Text style={{ marginTop: 3, color: "red", fontSize: 12 }}>
                    {error.classification_id}
                  </Text>
                )}
              </View>
              {forms.classification_id != 3 && (
                <Input
                  label="Department"
                  labelStyle={{
                    fontWeight: "normal",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    color: "#141E61",
                    paddingBottom: 8,
                  }}
                  placeholder="Enter Department"
                  inputStyle={{
                    fontFamily: "Poppins",
                    fontSize: 14,
                    backgroundColor: "white",
                    height: 50,
                    paddingLeft: 8,
                  }}
                  containerStyle={{ marginBottom: -12 }}
                  value={forms.department}
                  onChangeText={(val) => setForm({ ...forms, department: val })}
                />
              )}

              <Input
                label="Address"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter Home Address"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                  borderColor: error.address ? "red" : "black",
                  borderWidth: error.address ? 2 : 0,
                }}
                containerStyle={{ marginBottom: -12 }}
                value={forms.address}
                onChangeText={(val) => setForm({ ...forms, address: val })}
                errorMessage={error.address}
                errorStyle={{ marginBottom: 22 }}
              />

              <Input
                label="Email"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter Email"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                  borderColor: error.email ? "red" : "black",
                  borderWidth: error.email ? 2 : 0,
                }}
                inputMode="email"
                inputCapitalize="none"
                containerStyle={{ marginBottom: -12 }}
                value={forms.email}
                onChangeText={(val) => setForm({ ...forms, email: val })}
                errorMessage={error.email}
                errorStyle={{ marginBottom: 22 }}
              />

              <Input
                label="Contact Number"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter Contact Number"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                  borderColor: error.contact_number ? "red" : "black",
                  borderWidth: error.contact_number ? 2 : 0,
                }}
                containerStyle={{ marginBottom: -12 }}
                value={forms.contact_number}
                onChangeText={(val) =>
                  setForm({ ...forms, contact_number: val })
                }
                errorMessage={error.contact_number}
                errorStyle={{ marginBottom: 22 }}
                inputMode="numeric"
              />

              <View
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 12 }}
              >
                <Text
                  style={{
                    marginBottom: 8,
                    fontFamily: "Poppins",
                    color: "#141E61",
                  }}
                >
                  Vaccination Status
                </Text>

                <SelectDropdown
                  data={vaccinationStatus}
                  defaultButtonText="Select Vaccination Status"
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem.id);
                    setForm({
                      ...forms,
                      vaccination_status: selectedItem.value,
                    });
                  }}
                  buttonStyle={{
                    backgroundColor: "white",
                    borderColor: error.vaccination_status ? "red" : "black",
                    borderWidth: error.vaccination_status ? 2 : 0,
                    borderBottomWidth: error.vaccination_status ? 2 : 1,
                    width: "100%",
                  }}
                  buttonTextStyle={{
                    fontFamily: "Poppins",
                    fontSize: 14,
                    color: "#141E61",
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.value;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.value;
                  }}
                />
                {error.vaccination_status && (
                  <Text style={{ marginTop: 3, color: "red", fontSize: 12 }}>
                    {error.vaccination_status}
                  </Text>
                )}
              </View>

              {/* <Input
                label="Classification"
                labelStyle={{
                  fontWeight: "normal",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: "#141E61",
                  paddingBottom: 8,
                }}
                placeholder="Enter Confirmation New CreateAccount"
                inputStyle={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  backgroundColor: "white",
                  height: 50,
                  paddingLeft: 8,
                }}
                secureTextEntry={true}
                containerStyle={{ marginBottom: -12 }}
              /> */}
            </View>
          </ScrollView>
        </TabView.Item>

        <TabView.Item style={{ backgroundColor: "#EEEE", width: "100%" }}>
          <ScrollView style={{ backgroundColor: "#EEEEE" }}>
            <ListItem
              containerStyle={{
                marginLeft: 22,
                marginRight: 22,
                borderRadius: 8,
                marginTop: 12,
              }}
            >
              <Feather name="info" size={24} color="#141E61" />
              <ListItemContent>
                <ListItemTitle style={{ fontFamily: "Poppins", fontSize: 11 }}>
                  This images are use for face recognition. Please capture a
                  clear image.
                </ListItemTitle>
              </ListItemContent>
            </ListItem>
            <View style={{ marginLeft: 8, marginRight: 8, marginTop: 32 }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 14,
                    marginBottom: 8,
                  }}
                >
                  Upload Image 1
                </Text>
                {error.upload_1 && (
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      fontSize: 11,
                      marginBottom: 8,
                      color: "red",
                    }}
                  >
                    {error.upload_1}
                  </Text>
                )}
                <Avatar
                  title="Upload Image"
                  color="black"
                  size={180}
                  containerStyle={{ backgroundColor: "gray", borderRadius: 18 }}
                  source={
                    upload1
                      ? {
                          uri: "data:image/jpg;base64," + forms.upload1?.base64,
                        }
                      : require("../../assets/icon_trace.png")
                  }
                  onPress={() =>
                    navigation.navigate("Cameras", { option: "upload1" })
                  }
                ></Avatar>

                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 14,
                    marginBottom: 8,
                    marginTop: 40,
                  }}
                >
                  Upload Image 2
                </Text>
                {error.upload_2 && (
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      fontSize: 11,
                      marginBottom: 8,
                      color: "red",
                    }}
                  >
                    {error.upload_2}
                  </Text>
                )}
                <Avatar
                  title="Upload Image"
                  color="black"
                  size={180}
                  containerStyle={{ backgroundColor: "gray", borderRadius: 18 }}
                  source={
                    upload2
                      ? {
                          uri: "data:image/jpg;base64," + forms.upload2?.base64,
                        }
                      : require("../../assets/icon_trace.png")
                  }
                  onPress={() =>
                    navigation.navigate("Cameras", { option: "upload2" })
                  }
                ></Avatar>

                <Text>{JSON.stringify(navigation.params)}</Text>
              </View>
            </View>
          </ScrollView>
        </TabView.Item>

        <TabView.Item style={{ backgroundColor: "#EEEE", width: "100%" }}>
          <View style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
            <Input
              label="Username"
              labelStyle={{
                fontWeight: "normal",
                fontFamily: "Poppins",
                fontSize: 14,
                color: "#141E61",
                paddingBottom: 8,
              }}
              placeholder="Enter Username"
              inputStyle={{
                fontFamily: "Poppins",
                fontSize: 14,
                backgroundColor: "white",
                height: 50,
                paddingLeft: 8,
                borderColor: error.username ? "red" : "black",
                borderWidth: error.username ? 2 : 0,
              }}
              containerStyle={{ marginBottom: -12 }}
              value={forms.username}
              onChangeText={(val) => setForm({ ...forms, username: val })}
              errorMessage={error.username}
              errorStyle={{ marginBottom: 22 }}
            />
            <Input
              label="Password"
              labelStyle={{
                fontWeight: "normal",
                fontFamily: "Poppins",
                fontSize: 14,
                color: "#141E61",
                paddingBottom: 8,
              }}
              placeholder="Enter Password"
              inputStyle={{
                fontFamily: "Poppins",
                fontSize: 14,
                backgroundColor: "white",
                height: 50,
                paddingLeft: 8,
                borderColor: error.password ? "red" : "black",
                borderWidth: error.password ? 2 : 0,
              }}
              secureTextEntry={true}
              containerStyle={{ marginBottom: -12 }}
              value={forms.password}
              onChangeText={(val) => setForm({ ...forms, password: val })}
              errorMessage={error.password}
              errorStyle={{ marginBottom: 22 }}
            />

            <Input
              label="Password Confirmation"
              labelStyle={{
                fontWeight: "normal",
                fontFamily: "Poppins",
                fontSize: 14,
                color: "#141E61",
                paddingBottom: 8,
              }}
              placeholder="Enter Confirmation Password"
              inputStyle={{
                fontFamily: "Poppins",
                fontSize: 14,
                backgroundColor: "white",
                height: 50,
                paddingLeft: 8,
                borderColor: error.password ? "red" : "black",
                borderWidth: error.password ? 2 : 0,
              }}
              secureTextEntry={true}
              containerStyle={{ marginBottom: -12 }}
              value={forms.password_confirmation}
              onChangeText={(val) =>
                setForm({ ...forms, password_confirmation: val })
              }
              errorMessage={error.password}
              errorStyle={{ marginBottom: 22 }}
            />
            <Button
              title="Create Account"
              buttonStyle={{
                backgroundColor: "#141E61",
                padding: 12,
                borderRadius: 6,
              }}
              titleStyle={{ fontFamily: "Poppins", fontSize: 13 }}
              containerStyle={{ marginBottom: 20, marginTop: 18 }}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </TabView.Item>

        {/* <TabView.Item style={{ backgroundColor: "#EEEE", width: "100%" }}>
          <View style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
            <Input
              label="Password"
              labelStyle={{
                fontWeight: "normal",
                fontFamily: "Poppins",
                fontSize: 14,
                color: "#141E61",
                paddingBottom: 8,
              }}
              placeholder="Enter Password"
              inputStyle={{
                fontFamily: "Poppins",
                fontSize: 14,
                backgroundColor: "white",
                height: 50,
                paddingLeft: 8,
              }}
              secureTextEntry={true}
              containerStyle={{ marginBottom: -12 }}
              value={forms.password}
              onChangeText={(val) => setForm({ ...forms, password: val })}
            />

            <Input
              label="Password Confirmation"
              labelStyle={{
                fontWeight: "normal",
                fontFamily: "Poppins",
                fontSize: 14,
                color: "#141E61",
                paddingBottom: 8,
              }}
              placeholder="Enter Confirmation Password"
              inputStyle={{
                fontFamily: "Poppins",
                fontSize: 14,
                backgroundColor: "white",
                height: 50,
                paddingLeft: 8,
              }}
              secureTextEntry={true}
              containerStyle={{ marginBottom: -12 }}
              value={forms.confirmation_password}
              onChangeText={(val) =>
                setForm({ ...forms, confirmation_password: val })
              }
            />
            <Button
              title="Create Account"
              buttonStyle={{
                backgroundColor: "#141E61",
                padding: 12,
                borderRadius: 6,
              }}
              titleStyle={{ fontFamily: "Poppins", fontSize: 13 }}
              containerStyle={{ marginBottom: 20, marginTop: 18 }}
            />
          </View>
        </TabView.Item> */}
      </TabView>
    </>
  );
}

export default CreateAccount;
