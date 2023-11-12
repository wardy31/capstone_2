<template>
  <v-bottom-navigation v-model="value" color="primary" grow app>
    <v-btn to="/user/home">
      <span class="">Home</span>

      <v-icon>home</v-icon>
    </v-btn>

    <v-btn to="/user/health-declaration-form">
      <span class="">Form</span>

      <v-icon>file_copy</v-icon>
    </v-btn>

    <v-btn to="/user/location-record">
      <span class="">Records</span>

      <v-icon>auto_stories</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
};
</script>
