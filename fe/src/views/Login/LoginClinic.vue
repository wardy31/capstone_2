<template>
  <v-app id="apps">
    <v-card class="ma-auto" elevation="5" width="720">
      <v-container>
        <v-row class="accent">
          <v-col class="accent text-center">
            <h4 class="mt-3 ml-4 mb-16 primary--text text-left">UniTrace.</h4>
            <img :src="require('@/assets/doctors.svg')" width="280" />
          </v-col>
          <v-col
            class="white pb-8"
            style="height: 100%"
            :class="$vuetify.breakpoint.mobile ? `rounded-t-xl` : ``"
          >
            <v-container>
              <!-- <h1 class="font-weight-black primary--text">Welcome to</h1> -->
              <h2 class="font-weight-bold primary--text text-center mt-3 mb-4">
                UniTrace.
              </h2>

              <div class="mt-15 mx-2">
                <h4 class="primary--text mb-6 font-weight-bold">
                  Login Clinic
                </h4>

                <h5 class="mb-1 font-weight-regular">Username</h5>
                <v-text-field
                  outlined
                  dense
                  filled
                  class="rounded-md"
                  prepend-inner-icon="person"
                  v-model="credentials.username"
                  :error-messages="message?.username"
                ></v-text-field>

                <h5 class="mb-1 mt-n2 font-weight-regular">Password</h5>
                <v-text-field
                  outlined
                  dense
                  filled
                  class="rounded-md"
                  prepend-inner-icon="vpn_key"
                  :error-messages="message?.password"
                  type="password"
                  v-model="credentials.password"
                ></v-text-field>
                <v-btn
                  color="primary"
                  class="rounded-md mt-n2 text-capitalize"
                  block
                  @click="login"
                  :loading="loading"
                  ><h4>Login</h4></v-btn
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
