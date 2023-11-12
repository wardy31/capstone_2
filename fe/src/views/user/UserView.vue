<template>
  <v-app>
    <div v-if="loading" class="ma-auto ">
      <Loading />
    </div>
    <div v-else>
      <app-bar :data="user" type="user" @handleDialog="handleDialog" />
      <router-view></router-view>
      <bottom-bar></bottom-bar>
      <!-- <side-bar  v-if="!$vuetify.breakpoint.mobile" :dialog="dialog" />
      <bottom-bar v-if="$vuetify.breakpoint.mobile"></bottom-bar> -->
    </div>
  </v-app>
</template>

<script>
import Loading from '@/components/LoadingView.vue'
import AppBar from "@/components/AppBar.vue";
import BottomBar from "@/views/user/BottomNavigation.vue"
// import SideBar from "@/views/user/SideBar.vue";
import { mapState } from "vuex";
export default {
  components: { AppBar, Loading, BottomBar },
  computed: {
    ...mapState({
      loading: (state) => state.user.credentials.loading,
      user: (state) => state.user.credentials.data,
    }),
  },
  data() {
    return {
      dialog: true
    };
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/user-login")
    }
    this.$store.dispatch('user/getUser')

    console.log('env',process.env.VUE_APP_IMAGE_URL)
  },
  methods: {
    handleDialog() {
      this.dialog = !this.dialog
    }
  }
};
</script>
