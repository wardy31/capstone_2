import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid,
  useWindowDimensions,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Speech from "expo-speech";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  Feather,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import axios from "axios";
import { Button, Card, LinearProgress } from "@rneui/base";
import { CardTitle } from "@rneui/base/dist/Card/Card.Title";
import * as FaceDetector from "expo-face-detector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DailyLogs from "../../../store/stationLogs";
function StationCamera({ navigation }) {
  let cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [faceDetected, setFaceDetected] = useState(false);
  const [hide, setHide] = useState(true);
  const [cameraType, setCameraType] = useState(true);
  const [granted, setGranted] = useState(false);
  const [userName, setUserName] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [form, setForm] = useState(false);
  const [noFace, setNoFace] = useState(false);

  const [isFaceInCenter, setIsFaceInCenter] = useState(false);
  const windowDimensions = useWindowDimensions();
  const [displayBorder, setDisplayBorder] = useState([]);

  const { setDaily, daily } = DailyLogs();
  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(user);
      const res = await Camera.requestCameraPermissionsAsync();
      const av = await Speech.getAvailableVoicesAsync();
      await setGranted(true);
      await setUserName(JSON.parse(user).location.name);
      await setDaily(JSON.parse(user).location_id);
      setTimeout(() => {
        setHide(false);
        ToastAndroid.showWithGravity(
          "Camera Ready",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }, 2000);
      console.log("speech", av);
      console.log("camera", res.granted);
    })();
  }, []);

  useEffect(() => {
    if (faceDetected) {
      (async () => {
        const options = {
          quality: 1,
          base64: true,
          exif: false,
        };
        let getPhoto = await cameraRef.current.takePictureAsync(options);
        await setPhoto(getPhoto);
        await setLoaded(true);

        const forms = new FormData();
        forms.append("image", {
          uri: getPhoto.uri,
          name: "face.jpg",
          type: "image/jpg",
        });

        try {
          const user = await AsyncStorage.getItem("user");
          const { data } = await axios.post(
            `https://node.lnucontacttracing.online/api/prediction/${
              JSON.parse(user).id
            }`,
            forms,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          console.log("data", data);
          setLoaded(false);
          setPhoto(null);
          const dailyReset = await AsyncStorage.getItem("user");
          await setDaily(JSON.parse(dailyReset).location_id);

          if (
            data.user_patient[0]?.days_left ||
            data.user_tagged[0]?.days_left
          ) {
            const res = await axios.get(
              `https://node.lnucontacttracing.online/contact-notify/${
                data.id
              }/${JSON.parse(user).location_id}`
            );
            Speech.speak("Successfully Recorded", { language: "en-US" });
            setSuccess(true);
            console.log("contact", res.data);
            // setWarning(true);
            // Speech.speak("Warning! Please proceed to the clinic immediately.", {
            //   language: "en-US",
            // });
          } else if (!data.user_response_exists) {
            Speech.speak("No Health Declaration Submitted.", {
              language: "en-US",
            });
            setForm(true);
          } else {
            setSuccess(true);
            const res = await axios.get(
              `https://node.lnucontacttracing.online/contact-notify/${
                data.id
              }/${JSON.parse(user).location_id}`
            );
            Speech.speak("Successfully Recorded", { language: "en-US" });
          }

          setTimeout(() => {
            setFaceDetected(false);
            setWarning(false);
            setForm(false);
            setSuccess(false);
          }, 3000);
        } catch (error) {
          Speech.speak("Sorry Face Doesnt Recognize", { language: "en-US" });
          console.log("error", error);
          setLoaded(false);
          setNoFace(true);
          setPhoto(null);
          setTimeout(() => {
            setFaceDetected(false);
            setNoFace(false);
          }, 3000);
        }
      })();
    }
  }, [faceDetected]);

  const handleFaceDetection = async ({ faces }) => {
    console.log(faces);
    if (faces.length > 0) {
      setDisplayBorder(faces[0]);
      // Get the coordinates of the first face detected
      const { x, y } = faces[0].bounds.origin;
      const { width, height } = faces[0].bounds.size;

      // Calculate the center of the face
      const faceCenterX = x + width / 2;
      const faceCenterY = y + height / 2;

      // Get the dimensions of the screen
      const screenWidth = windowDimensions.width;
      const screenHeight = windowDimensions.height;

      // Calculate the center of the screen
      const screenCenterX = screenWidth / 2;
      const screenCenterY = screenHeight / 2;

      // Check if the face is in the center of the screen
      const isFaceInCenter =
        Math.abs(faceCenterX - screenCenterX) <= 50 &&
        Math.abs(faceCenterY - screenCenterY) <= 50;

      setIsFaceInCenter(isFaceInCenter);
      console.log(faces[0]);
      if (isFaceInCenter) {
        setFaceDetected(true);
      }
    }
  };

  if (!granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>
          Accept Permission Camera
        </Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={{ flex: 2 }}>
        <Camera
          style={{ flex: 1, width: "100%" }}
          type={cameraType ? CameraType.front : CameraType.back}
          ref={cameraRef}
          onFacesDetected={hide ? null : handleFaceDetection}
          ratio="16:9"
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 1000,
          }}
        ></Camera>
      </View>

      <View
        style={{
          position: "absolute",
          left: displayBorder?.bounds?.origin?.x,
          top: displayBorder?.bounds?.origin?.y,
          width: displayBorder?.bounds?.size?.width,
          height: displayBorder?.bounds?.size?.height,
          borderColor: isFaceInCenter || !displayBorder ? "green" : "red",
          borderWidth: 6,
        }}
      ></View>

      <View
        style={{ flex: 1, position: "absolute", width: "100%", bottom: 20 }}
      >
        {success && (
          <View style={{ marginBottom: "50%", width: "100%" }}>
            <Card containerStyle={{ borderRadius: 14 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Feather name="check-circle" size={52} color="teal" />
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 17,
                    color: "teal",
                    marginTop: 12,
                  }}
                >
                  Successfully Recorded
                </Text>
              </View>
            </Card>
          </View>
        )}

        {noFace && (
          <View style={{ marginBottom: "50%", width: "100%" }}>
            <Card containerStyle={{ borderRadius: 14 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Entypo name="emoji-sad" size={52} color="orange" />
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 17,
                    color: "orange",
                    marginTop: 12,
                  }}
                >
                  Sorry, Face Doesnt Recognize
                </Text>
              </View>
            </Card>
          </View>
        )}

        {form && (
          <View style={{ marginBottom: "50%", width: "100%" }}>
            <Card containerStyle={{ borderRadius: 14 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AntDesign name="form" size={52} color="#141E61" />
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 17,
                    color: "#141E61",
                    marginTop: 12,
                  }}
                >
                  No Health Declaration Submitted.
                </Text>
              </View>
            </Card>
          </View>
        )}

        {warning && (
          <View style={{ marginBottom: "50%", width: "100%" }}>
            <Card containerStyle={{ borderRadius: 14 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Entypo name="warning" size={52} color="red" />
                <Text
                  style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 17,
                    color: "red",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  Warning! Please proceed to the clinic immediately.
                </Text>
              </View>
            </Card>
          </View>
        )}

        {loaded && (
          <View style={{ marginBottom: "50%", width: "100%", borderRadius: 8 }}>
            <Card>
              <Text style={{ fontFamily: "PoppinsBold", fontSize: 17 }}>
                Verifying Face Please Wait ...
              </Text>
              {/* <Image style={{justifyContent:"center",alignItems:"center"}} source={require('../../../assets/loading.gif')}></Image> */}
              <LinearProgress
                style={{ marginVertical: 10, height: 12, borderRadius: 2 }}
                color="#141E61"
              />
            </Card>
          </View>
        )}
        <View>
          <Button
            TouchableComponent={TouchableWithoutFeedback}
            containerStyle={{ alignItems: "center" }}
            iconPosition="top"
            icon={
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            }
            title="Reverse Camera"
            type="clear"
            titleStyle={{
              fontFamily: "Poppins",
              fontSize: 14,
              color: "white",
            }}
            onPress={() => setCameraType(!cameraType)}
          ></Button>
          <Card containerStyle={{ borderRadius: 4 }}>
            <CardTitle style={{ textAlign: "left" }}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "PoppinsBold",
                  color: "#141E61",
                }}
              >
                {userName}
              </Text>
            </CardTitle>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 15, fontFamily: "PoppinsBold" }}>
                  User Visited Today :
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      paddingTop: 2,
                      fontSize: 18,
                      fontFamily: "PoppinsBold",
                      marginLeft: 6,
                      marginRight: 8,
                    }}
                  >
                    {daily}
                  </Text>
                  <FontAwesome5
                    name="user"
                    size={20}
                    color="#141E61"
                    style={{ marginBottom: 2 }}
                  />
                </View>
              </View>

              {/* <Text style={{ fontSize: 14, fontFamily: "PoppinsBold" }}>
              Status : <Text>Pass</Text>
            </Text> */}
            </View>
          </Card>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StationCamera;
