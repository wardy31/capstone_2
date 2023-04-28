import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import * as FaceDetector from "expo-face-detector";

import { Avatar } from "@rneui/base";
import BaseStore from "../../store/base64";
import axios from "axios";
function Cameras({ navigation, route }) {
  const { option } = route.params;
  let cameraRef = useRef();
  const [photo, setPhoto] = useState();
  const [cameraType, setCameraType] = useState(true);
  const { setData } = BaseStore();
  useEffect(() => {
    (async () => {
      const res = await Camera.requestCameraPermissionsAsync();
      console.log("camera", res.granted);
    })();
  }, []);

  const toggle = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let getPhoto = await cameraRef.current.takePictureAsync(options);
    await setPhoto(getPhoto);
    await setData(getPhoto, option);
    await navigation.navigate("CreateAccount");
    console.log("photo", getPhoto);

    // const forms = new FormData();
    // forms.append('first_name',"wardy")

    // forms.append('image',{
    //   uri:getPhoto.uri,
    //   name:"ward.jpg",
    //   type:"image/jpg"
    // })

    // forms.append('avatar',{
    //   uri:getPhoto.uri,
    //   name:"wardy.jpg",
    //   type:"image/jpg"
    // })

    // await axios
    //   .post("http://192.168.1.136:3000/ge", forms, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   })
    //   .then((e) => {
    //     console.log(e.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  const cameraReady = async () => {
    console.log("ready");
  };

  const [detectedFaces, setDetectedFaces] = useState([]);
  const [isFaceInCenter, setIsFaceInCenter] = useState(false);
  const windowDimensions = useWindowDimensions();
  const [countdown, setCountdown] = useState(5);

  const handleFacesDetected = async ({ faces }) => {
    setDetectedFaces(null);
    if (faces.length > 0) {
      setDetectedFaces(faces[0]);
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

      if(isFaceInCenter){
        const options = {
          quality: 1,
          base64: true,
          exif: false,
        };
        let getPhoto = await cameraRef.current.takePictureAsync(options);
        await setPhoto(getPhoto);
        await setData(getPhoto, option);
        await navigation.navigate("CreateAccount");
        console.log("photo", getPhoto);
      }
    } else {
      setIsFaceInCenter(false);
    }
  };

  return (
    <View style={style.container}>
        <Camera
          style={{ flex: 1 }}
          ratio="16:9"
          type={cameraType ? CameraType.front : CameraType.back}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
          }}
          onCameraReady={cameraReady}
          ref={cameraRef}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              marginBottom:25
            }}
          >
            <Avatar
              containerStyle={{ backgroundColor: "#141E61" }}
              icon={{ name: "camera", type: "entypo", size: 28 }}
              size={60}
              rounded
              onPress={toggle}
            />
            <Avatar
              containerStyle={{ backgroundColor: "#141E61" }}
              icon={{ name: "cycle", type: "entypo", size: 28 }}
              size={60}
              rounded
              onPress={() => setCameraType(!cameraType)}
            />
          </View>
        </Camera>

        <View
          style={{
            position: "absolute",
            left: detectedFaces?.bounds?.origin?.x,
            top: detectedFaces?.bounds?.origin?.y,
            width: detectedFaces?.bounds?.size?.width,
            height: detectedFaces?.bounds?.size?.height,
            borderColor: isFaceInCenter || !detectedFaces ? "green" : "red",
            borderWidth: 2,
          }}
        >
        </View>

        {/* {detectedFaces.map((face, index) => {
          const { x, y } = face.bounds.origin;
          const { width, height } = face.bounds.size;
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                borderColor: "red",
                borderWidth: 2,
              }}
            />
          );
        })} */}
      </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Cameras;
