<template>
  <v-app id="apps">
    <v-card class="ma-auto " elevation="5" width="720" tile>
      <v-container>
        <v-row class="accent">
          <v-col class="accent">
            <h4 class="mt-3 ml-2 mb-16 primary--text">UniTrace.</h4>
            <img :src="require('@/assets/user_4.svg')" width="320" />
          </v-col>
          <v-col class="white" :class="$vuetify.breakpoint.mobile ? `rounded-t-xl` : ``">
            <v-container>
              <h2 class="font-weight-bold mb-4 mt-3 primary--text text-center">UniTrace.</h2>

              <div class="mt-15 mx-2">
                <h4 class="primary--text mb-6 font-weight-bold">Login Account</h4>
                <h5 class="mb-1 font-weight-regular">Username</h5>
                <v-text-field outlined dense class="rounded-lg" filled prepend-inner-icon="person"
                  :error-messages="message.username" v-model="credentials.username"></v-text-field>

                <h5 class="mb-1 mt-n1 font-weight-regular">Password</h5>
                <v-text-field outlined dense type="password" class="rounded-lg" prepend-inner-icon="vpn_key" filled
                  v-model="credentials.password" :error-messages="message.password"></v-text-field>

                <v-btn color="primary" class="rounded-md mt-n1 text-capitalize" block @click="login()" :loading="loading">
                  <h4>Login</h4>
                </v-btn>
                <v-btn class="rounded-md mt-2" block text to="/UserRegister">
                  <h4 class="font-weight-regular text-capitalize mt-n2">Create Account</h4>
                </v-btn>
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
  updated() {
    if (this.next) {
      this.$router.push("/user/home");
      this.$store.dispatch("user/reset");
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.user.credentials.loading,
      data: (state) => state.user.credentials.data,
      next: (state) => state.user.credentials.next,
      error: (state) => state.user.credentials.error,
      message: (state) => state.user.credentials.message,
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
    login() {
      this.$store.dispatch("user/login", this.credentials);
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
