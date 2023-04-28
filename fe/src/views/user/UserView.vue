<template>
  <v-app>
    <div v-if="loading" class="ma-auto ">
        <Loading/>
    </div>
    <div v-else>
      <app-bar :data="user" type="user" />
      <router-view></router-view>
      <side-bar />
    </div>
  </v-app>
</template>

<script>
import Loading from '@/components/LoadingView.vue'
import AppBar from "@/components/AppBar.vue";
import SideBar from "@/views/user/SideBar.vue";
import { mapState } from "vuex";
export default {
  components: { AppBar, SideBar,Loading },
  computed: {
    ...mapState({
      loading: (state) => state.user.credentials.loading,
      user: (state) => state.user.credentials.data,
    }),
  },
  data() {
    return {};
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/user-login")
    }
    this.$store.dispatch('user/getUser')
  },
};
</script>
