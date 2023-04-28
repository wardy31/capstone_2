<template>
  <v-app>
    <v-main class="bg">
      <v-container class="ml-10">
        <div class="mt-12">
          <h2 class="font-weight-bold">Edit Personal Profile</h2>
        </div>
        <div class="my-8">
          <v-avatar color="primary" size="90" class="white--text" tile
            ><h3>{{ user.first_name.slice(0,1).toUpperCase() }}</h3></v-avatar
          >
        </div>

        <v-divider></v-divider>
        <div class="mb-2 mt-5">
          <h3 class="gray--text mb-2">Personal Information</h3>
          <v-btn color="primary" outlined small class="mb-5" @click="editDialog"
            ><v-icon left>edit</v-icon> Edit Profile</v-btn
          >
        </div>

        <div class="d-flex mb-2">
          <h4>Name:</h4>
          <h4 class="ml-2 font-weight-bold primary--text text-capitalize">
            {{ `${user.first_name} ${user.middle_name} ${user.last_name}` }}
          </h4>
        </div>
        <!-- 
            <div class="d-flex mb-3">
                <h4>Age:</h4>
                <h4 class="ml-2 font-weight-bold primary--text">21</h4>
            </div> -->

        <div class="d-flex mb-3">
          <h4>Gender:</h4>
          <h4 class="ml-2 font-weight-bold primary--text text-capitalize">
            {{ user.gender }}
          </h4>
        </div>

        <div class="d-flex mb-3">
                <h4>Address:</h4>
                <h4 class="ml-2 font-weight-bold primary--text">{{user.address}}</h4>
            </div>

        <div class="d-flex mb-3">
          <h4>Contact Number:</h4>
          <h4 class="ml-2 font-weight-bold primary--text">
            {{ user.contact_number }}
          </h4>
        </div>

        <div class="d-flex mb-3">
          <h4>Email:</h4>
          <h4 class="ml-2 font-weight-bold primary--text">{{ user.email }}</h4>
        </div>

        <div class="d-flex mb-3">
          <h4>Role:</h4>
          <h4 class="ml-2 font-weight-bold primary--text text-capitalize">
            {{ user.role.name }}
          </h4>
        </div>
        <!-- <div class="d-flex mb-3">
                <h4>Vaccination Status:</h4>
                <h4 class="ml-2 font-weight-bold primary--text">Fully Vaccinated</h4>
            </div> -->

        <v-divider class="mt-8"></v-divider>
        <div class="mb-6 mt-6">
          <h3 class="gray--text mb-2">Change Security Password</h3>
        </div>
        <div>
          <v-card color="transparent" flat width="320">
            <v-alert type="success" :value="success">
              Change Password Successfully
            </v-alert>
            <v-text-field
              outlined
              label="Current Password"
              type="password"
              dense
              filled
              :error-messages="error?.old_password?.length ? error.old_password : false"
              v-model="old_password"
            ></v-text-field>
            <v-text-field
              outlined
              label="New Password"
              type="password"
              dense
              filled
              :error-messages="error?.new_password?.length ? error.new_password : false"
              v-model="new_password"
            ></v-text-field>
            <v-text-field
              outlined
              label="Confirm New Password"
              type="password"
              dense
              filled
              v-model="new_password_confirmation"
              :error="error?.new_password?.length ? true : false"
            ></v-text-field>

            <div class="mt-n2 d-flex justify-end">
              <v-btn class="primary text-capitalize" @click="handlePassword"><h5>Change Password</h5></v-btn>
            </div>
          </v-card>
        </div>
        <v-divider class="mt-8"></v-divider>
      </v-container>
      <EditProfile :profile="profile" @handleProfile="profile = null" @snackBar="snackbar = true"/>
    </v-main>
    <v-snackbar
      :timeout="2000"
      v-model="snackbar"
      bottom
      right
      color="success"
      elevation="24"
    >
      Successfully Updated Profile.
    </v-snackbar>
  </v-app>

</template>

<script>
import { mapState } from "vuex";
import EditProfile from "@/views/admin/Dialog/Profile/EditProfile.vue"
export default {
  components:{
    EditProfile
  },
  mounted() {
    console.log("user", this.user);
  },
  data() {
    return {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
      profile:"",
      snackbar:false
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.clinic.credentials.loading,
      user: (state) => state.clinic.credentials.data,
      success: (state) => state.clinic.credentials.success,
      error: (state) => state.clinic.credentials.error,
    }),
  },
  methods: {
      handlePassword() {
        const forms = {
          old_password: this.old_password,
          new_password: this.new_password,
          new_password_confirmation: this.new_password_confirmation,
        };
        this.$store.dispatch("clinic/changePassword", { id: this.user.id,forms:forms });
        console.log(forms + this.user.id);
      },
      editDialog(){
        this.profile = this.user
      }
    },
};
</script>

<style scoped>
.bg {
  background-color: #f8f0f0;
}
.adj {
  width: 280px;
}
</style>
