<template>
  <v-app-bar app color="accent">
    <v-app-bar-nav-icon
      color="primary"
      @click="$emit('handleDialog')"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <h4 class="primary--text mr-4 text-capitalize font-weight-bold">
        UniTrace.
      </h4>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu
      :rounded="rounded"
      offset-y
      transition="slide-y-transition"
      max-width="280"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-badge color="red" left dot :value="contact">
          <v-icon
            class="primary--text mr-8"
            size="26"
            v-bind="attrs"
            v-on="on"
            @click="$store.state.notifications.contact = false"
          >
            sick
          </v-icon>
        </v-badge>
      </template>
      <v-list>
        <v-list-item three-line v-for="notif in fiveNotif()" :key="notif.id">
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold text-capitalize"
              :class="[notif.type == 3 ? 'error--text' : '']"
            >
              <h5>
                {{
                  `${notif.user_account.first_name} ${notif.user_account.last_name}`
                }}
              </h5>
            </v-list-item-title>
            <v-list-item-subtitle
              class="text-capitalize pt-2 pb-2 black--text"
              :class="[notif.type == 3 ? 'error--text' : '']"
            >
              <h5 class="font-weight-thin">{{ notif.message }}</h5>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <h5 class="font-weight-thin">
                {{ notif.created_at | timeFormat }}
              </h5>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-btn
          block
          text
          color="primary"
          class="text-capitalize"
          to="/admin/notifications"
          >See all notifications</v-btn
        >
      </v-list>
    </v-menu>

    <v-menu
      :rounded="rounded"
      offset-y
      transition="slide-y-transition"
      max-width="280"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-badge color="red" left dot :value="dot">
          <v-icon
            class="primary--text mr-8"
            size="26"
            v-bind="attrs"
            v-on="on"
            @click="$store.state.notifications.dot = false"
          >
            notifications
          </v-icon>
        </v-badge>
      </template>
      <v-list>
        <v-list-item three-line v-for="notif in fiveNotif()" :key="notif.id">
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold text-capitalize"
              :class="[notif.type == 3 ? 'error--text' : '']"
            >
              <h5>
                {{
                  `${notif.user_account.first_name} ${notif.user_account.last_name}`
                }}
              </h5>
            </v-list-item-title>
            <v-list-item-subtitle
              class="text-capitalize pt-2 pb-2 black--text"
              :class="[notif.type == 3 ? 'error--text' : '']"
            >
              <h5 class="font-weight-thin">{{ notif.message }}</h5>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <h5 class="font-weight-thin">
                {{ notif.created_at | timeFormat }}
              </h5>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-btn
          block
          text
          color="primary"
          class="text-capitalize"
          to="/admin/notifications"
          >See all notifications</v-btn
        >
      </v-list>
    </v-menu>
    <h5 class="black--text mr-4 text-capitalize font-weight-regular">
      Welcome,
      <b class="font-weight-bold primary--text">{{
        `${data.first_name} ${data.last_name}`
      }}</b>
    </h5>
    <v-menu offset-y bottom transition="slide-y-transition" rounded="lg">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          color="primary"
          class="white--text font-weight-bold"
          v-bind="attrs"
          v-on="on"
          size="50"
          >{{ data.first_name.slice(0, 1).toUpperCase() }}</v-avatar
        >
      </template>
      <v-list>
        <v-list-item to="/admin/editprofile">
          <v-list-item-icon class="mr-4"
            ><v-icon color="primary">account_circle</v-icon></v-list-item-icon
          >
          <v-list-item-title class="font-weight-bold">
            <h5>Edit Profile</h5>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout">
          <v-list-item-icon class="mr-4"
            ><v-icon color="primary">logout</v-icon></v-list-item-icon
          >
          <v-list-item-title class="font-weight-bold">
            <h5>Logout</h5>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  props: ["data", "dialog"],
  mounted() {
    this.$store.dispatch("notifications/getNotifications");
  },
  filters: {
    dateFormat(val) {
      return moment(val).format("MMM. DD, YYYY").toString();
    },
    timeFormat(val) {
      return moment(val).fromNow().toString();
    },
  },
  computed: {
    ...mapState({
      notify: (state) => state.notifications.data,
      loading: (state) => state.notifications.loading,
      dot: (state) => state.notifications.dot,
      contact: (state) => state.notifications.contact,
    }),
  },
  methods: {
    fiveNotif() {
      const slice = this.notify.slice(0, 4);
      console.log("wa", slice);
      return slice;
    },
    async logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/clinic-login");
    },
  },
};
</script>
