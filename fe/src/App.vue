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
    });

    socket.on("connect", () => {
      console.log("isConnected", socket.connected); // x8WIv7-mJelg7on_ALbx
    });
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  font-family: "Poppins", sans-serif;
}
</style>
