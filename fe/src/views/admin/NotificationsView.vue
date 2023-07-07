<template>
  <v-main class="accent">
    <v-card class="mx-12 mt-12">
      <v-card-title><h3 class="primary--text">Notifications</h3></v-card-title>
      <v-list>
        <v-list-item three-line v-for="data in data" :key="data.id">
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-capitalize" :class="[data.type == 3 ? 'error--text' : '']">
              {{
                `${data.user_account.first_name} ${data.user_account.last_name}`
              }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-capitalize pt-2 pb-2 black--text" :class="[data.type == 3 ? 'error--text' : '']">
              {{ data.message }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{ data.created_at | dateFormat  }} {{  data.created_at | timeFormat }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-card>
  </v-main>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  mounted() {
    // this.$store.dispatch("notifications/getNotifications");
  },
  filters:{
    dateFormat(val){
      return moment(val).format('MMM. DD, YYYY').toString()
    },
    timeFormat(val){
      return moment(val).fromNow().toString()
    }
  } , 
  computed: {
    ...mapState({
      data: (state) => state.notifications.data,
      loading: (state) => state.notifications.loading,
    }),
  },
  data() {
    return {};
  },
};
</script>
