<template>
  <v-app>
    <div v-if="loading" class="ma-auto">
      <Loading />
    </div>
    <div v-else>
      <v-app>
        <app-bar :data="user" type="admin"  @handleDialog="handleDialog" :dialog="dialog"/>
        <router-view></router-view>
        <side-bar :dialog="dialog" />
      </v-app>
    </div>
  </v-app>
</template>

<script>
import AppBar from "@/components/ClinicAppBar.vue";
import SideBar from "@/components/SideBar.vue";
import Loading from "@/components/LoadingView.vue";
import { mapState } from "vuex";
export default {
  components: { AppBar, SideBar, Loading },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/clinic-login");
    }
    this.$store.dispatch("clinic/getUser");

    setInterval(() => {
      console.log("lol");
      this.$store.dispatch("notifications/getNotifications");
    }, 5000);
  },
  data() {
    return {
      isNotify: false,
      dialog:true
    };
  },
  watch: {
    isNotify() {
      if (this.isNotify) {
        this.handleNotif();
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.clinic.credentials.loading,
      user: (state) => state.clinic.credentials.data,
    }),
  },
  methods: {
    handleDialog(){
      this.dialog = !this.dialog
    },
    async handleNotif() {
      this.isNotify = false;
      const res = await this.$store.dispatch("notifications/getNotifications");

      if (res || !res) {
        this.isNotify = true;
        console.log("notif");
      }
    },
  },
};
</script>
