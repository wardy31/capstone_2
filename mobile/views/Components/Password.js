import { View, Text,ToastAndroid } from "react-native";
import { Input, ListItem } from "@rneui/themed";
import { Button } from "@rneui/base";
import UserStore from "../../store/user";
import { useState } from "react";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";

function Password() {
  const { setPassword, error,loading} = UserStore();
  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const handlePassword = async() =>{
    const res = await setPassword(form)

    if(res){
      setForm({...form,current_password:"",password:"",password_confirmation:""})
      ToastAndroid.showWithGravity(
        'Change Password Successful',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
    console.log('res',res);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#EEEEE" }}>
      <View style={{ marginLeft: 8, marginRight: 8 }}>
        <Input
          label="Current Password"
          labelStyle={{
            fontWeight: "normal",
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#141E61",
            paddingBottom: 8,
          }}
          placeholder="Enter Current Password"
          inputStyle={{
            fontFamily: "Poppins",
            fontSize: 14,
            backgroundColor: "white",
            height: 50,
            paddingLeft: 8,
            borderColor:error.current_password ? "red" :"black",
            borderWidth:error.current_password ? 2 : 1
          }}
          containerStyle={{ marginTop: 22 }}
          secureTextEntry={true}
          value={form.current_password}
          onChangeText={val => setForm({...form,current_password:val})}
          errorStyle={{marginBottom:12}}
          errorMessage={error.current_password}
        />

        <Input
          label="New Password"
          labelStyle={{
            fontWeight: "normal",
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#141E61",
            paddingBottom: 8,
          }}
          placeholder="Enter New Password"
          inputStyle={{
            fontFamily: "Poppins",
            fontSize: 14,
            backgroundColor: "white",
            height: 50,
            paddingLeft: 8,
            borderColor:error.password ? "red" :"black",
            borderWidth:error.password ? 2 : 1
          }}
          secureTextEntry={true}
          value={form.password}
          onChangeText={val => setForm({...form,password:val})}
          errorStyle={{marginBottom:12}}
          errorMessage={error.password}
        />

        <Input
          label="Confirm New Password"
          labelStyle={{
            fontWeight: "normal",
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#141E61",
            paddingBottom: 8,
          }}
          placeholder="Enter Confirmation New Password"
          inputStyle={{
            fontFamily: "Poppins",
            fontSize: 14,
            backgroundColor: "white",
            height: 50,
            paddingLeft: 8,
            borderColor:error.password ? "red" :"black",
            borderWidth:error.password ? 2 : 1
          }}
          secureTextEntry={true}
          value={form.password_confirmation}
          onChangeText={val => setForm({...form,password_confirmation:val})}
        />

        <Button
          title="Change Password"
          buttonStyle={{
            backgroundColor: "#141E61",
            padding: 12,
            borderRadius: 6,
          }}
          containerStyle={{marginLeft:8,marginRight:8}}
          titleStyle={{ fontFamily: "Poppins", fontSize: 13 }}
          loading={loading}
          onPress={handlePassword}
        />
      </View>
    </View>
  );
}

export default Password;
