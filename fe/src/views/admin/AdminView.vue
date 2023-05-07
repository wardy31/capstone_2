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
  },
  data() {
    return {
      dialog:true
    };
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
  },
};
</script>
