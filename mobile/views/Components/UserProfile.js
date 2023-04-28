import { Avatar, Divider } from "@rneui/base";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import LoginStore from '../../store/login'

function UserProfile() {
  const {user,url} = LoginStore()

  console.log('rr',user);
  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingLeft: 28, paddingRight: 28 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Avatar
            size={120}
            rounded
            source={{ uri: `${url}/${user.images_path}` }}
          />
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 18,
              marginTop: 8,
              color: "#141E61",
              textTransform:"uppercase"
            }}
          >
            {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 13,
              color: "gray",
              marginTop: -4,
              textTransform:"uppercase"
            }}
          >
            {user?.classification.name}
          </Text>
        </View>

        <Divider style={{ paddingTop: 12, paddingBottom: 12 }} />
        
        <View style={{ marginTop: 32 }}>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 16,
              color: "#141E61",
              paddingBottom:28
            }}
          >
            Personal Information
          </Text>

          <Text style={{ fontFamily: "Poppins", fontSize: 14, paddingBottom:18 }}>
            Gender : {user?.gender == 1 ? "Male" : "Female"}
          </Text>

          {/* <Text style={{ fontFamily: "Poppins", fontSize: 14 }}>
            August 15,2000
          </Text> */}

          <Text style={{ fontFamily: "Poppins", fontSize: 14 , paddingBottom:18}}>
           Home Address : {user?.address}
          </Text>

          <Text style={{ fontFamily: "Poppins", fontSize: 14, paddingBottom:18 }}>
           Department : {user?.department}
          </Text>
        </View>

        <View>
          {/* <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 16,
              color: "#141E61",
            }}
          >
            Contact Details
          </Text> */}

          <Text style={{ fontFamily: "Poppins", fontSize: 14 , paddingBottom:18}}>
            Contact Number : {user?.contact_number}
          </Text>

          <Text style={{ fontFamily: "Poppins", fontSize: 14 , paddingBottom:18}}>
            Email : {user?.email}
          </Text>

          <Text style={{ fontFamily: "Poppins", fontSize: 14 , paddingBottom:18}}>
           Vaccination Status : {user?.vaccination_status}
          </Text>

        </View>
        
        {/* <View style={{ marginTop: 32 }}>
          <Text
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 16,
              color: "#141E61",
            }}
          >
            Academic Details
          </Text>

          <Text style={{ fontFamily: "Poppins", fontSize: 14 }}>
            4th Year | Bachelor of Science Information Technology
          </Text>
        </View> */}
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

export default UserProfile;
