<template>
  <router-view />
</template>

<script>
import { socket } from "@/config/webSocket";
export default {
  mounted() {
    socket.on("clinic-notify", (arg) => {
      console.log("onFunction", arg);
      this.$store.dispatch("notifications/getNotifications");
      this.$store.state.notifications.dot = true
    });
    socket.on("clinic-contact", (arg) => {
      console.log("onFunction", arg);
      this.$store.state.notifications.contact = true
      this.$store.dispatch("notifications/getNotifications");
    });
    
    socket.on("connect", () => {
      console.log("isConnected", socket.connected); // x8WIv7-mJelg7on_ALbx
    });

    console.log(process.env.VUE_APP_API)
    console.log(process.env.VUE_APP_SOCKET)
    console.log('HOST',process.env.NODE_ENV)
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  font-family: "Poppins", sans-serif;
}
</style>
