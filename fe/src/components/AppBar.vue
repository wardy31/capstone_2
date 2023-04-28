<template>
  <v-app-bar app color="accent">
    <v-app-bar-nav-icon color="primary"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>
    <h4 class="black--text mr-4 text-capitalize font-weight-regular">
      Welcome,
      <b class="font-weight-bold primary--text">{{
        `${data.first_name} ${data.last_name}`
      }}</b>
    </h4>
    <v-menu offset-y bottom transition="slide-y-transition" rounded="lg">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="primary" v-bind="attrs" v-on="on" size="50"
          >A</v-avatar
        >
      </template>
      <v-list>
        <v-list-item to="/admin/editprofile" v-if="type == `admin`">
          <v-list-item-icon class="mr-4"
            ><v-icon color="primary">account_circle</v-icon></v-list-item-icon
          >
          <v-list-item-title class="font-weight-bold"
            ><h5>Edit Profile</h5></v-list-item-title
          >
        </v-list-item>
        <v-list-item to="/user/personal-profile" v-else>
          <v-list-item-icon class="mr-4"
            ><v-icon color="primary">account_circle</v-icon></v-list-item-icon
          >
          <v-list-item-title class="font-weight-bold"
            ><h5>Edit Profile</h5></v-list-item-title
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout">
          <v-list-item-icon class="mr-4"
            ><v-icon color="primary">logout</v-icon></v-list-item-icon
          >
          <v-list-item-title class="font-weight-bold"
            ><h5>Logout</h5></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: ["data", "type"],
  methods: {
    async logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/user-login");
    },
  },
};
</script>
