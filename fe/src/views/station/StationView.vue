<template>
    <v-app>
      <div v-if="loading" class="ma-auto">
        <Loading />
      </div>
      <div v-else>
        <v-app>
          <app-bar :data="user" />
          <router-view></router-view>
        </v-app>
      </div>
    </v-app>
  </template>
  
  <script>
  import AppBar from "@/views/station/component/AppBar.vue";
  import Loading from "@/components/LoadingView.vue";
  import { mapState } from "vuex";
  export default {
    components: { AppBar, Loading },
    mounted() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/station-login");
      }
      this.$store.dispatch("station/userStation");
    },
    computed: {
      ...mapState({
        loading: (state) => state.station.credentials.loading,
        user: (state) => state.station.credentials.user,
      }),
    },
  };
  </script>
  