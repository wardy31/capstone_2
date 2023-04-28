<template>
  <v-app id="apps">
    <v-card class="ma-auto rounded-xl" elevation="5">
      <v-container>
        <v-row>
          <v-col class="rounded-xl rounded-r-0 accent">
            <h4 class="mt-3 ml-2 mb-16 primary--text">UniTrace</h4>
            <img :src="require('@/assets/undraw/medicine.png')" width="340" />
          </v-col>
          <v-col>
            <v-container>
              <h1 class="font-weight-black primary--text">Welcome To</h1>
              <h1 class="font-weight-bold primary--text">UniTrace</h1>

              <div class="mt-12">
                <v-alert type="error" text dense :value="error">
                  {{ message }}
                </v-alert>
                <h4 class="primary--text mb-4 bolds">Login Clinic</h4>

                <h5 class="mb-1 font-weight-regular">Username</h5>
                <v-text-field
                  outlined
                  dense
                  class="rounded-lg"
                  v-model="credentials.username"
                ></v-text-field>

                <h5 class="mb-1 mt-n4 font-weight-regular">Password</h5>
                <v-text-field
                  outlined
                  dense
                  class="rounded-lg"
                  type="password"
                  v-model="credentials.password"
                ></v-text-field>
                <v-btn
                  color="primary"
                  class="rounded-md mt-n2"
                  block
                  @click="login"
                  :loading="loading"><h4>Login</h4></v-btn
                >
                <!-- <v-btn class="rounded-xl mt-2" block text to="/ClinicRegister"
                  ><h5 class="font-weight-regular">Create Account</h5></v-btn
                > -->
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    // if (localStorage.getItem("token")) {
    //   this.$router.push("/admin/dashboard");
    // }
  },
  updated() {
    if (this.next) {
      this.$router.push("/admin/dashboard");
      this.$store.dispatch("clinic/reset");
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.clinic.credentials.loading,
      next: (state) => state.clinic.credentials.next,
      error: (state) => state.clinic.credentials.error,
      message: (state) => state.clinic.credentials.message,
    }),
  },
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      this.$store.dispatch("clinic/login", this.credentials);
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
#apps {
  background-color: #141e61;
  font-family: "Poppins", sans-serif;
}
</style>
