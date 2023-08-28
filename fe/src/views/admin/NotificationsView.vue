<template>
  <v-main class="accent">
    <div class="mx-12 mt-8 mb-4">
      <h2 class="primary--text">Notifications</h2>
    </div>
    <div class="mx-12">
      <v-row>
        <v-col>
          <v-card class="elevation-6">
            <v-list>
              <v-list-item three-line v-for="data in fiveNotif(2)" :key="data.id">
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold text-capitalize"
                    :class="[data.type == 3 ? 'error--text' : '']"
                  >
                    {{
                      `${data.user_account.first_name} ${data.user_account.last_name}`
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="text-capitalize pt-2 pb-2 black--text"
                    :class="[data.type == 3 ? 'error--text' : '']"
                  >
                    {{ data.message }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    >{{ data.created_at | dateFormat }}
                    {{ data.created_at | timeFormat }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card class="elevation-6">
            <v-list>
              <v-list-item three-line v-for="data in fiveNotif(1)" :key="data.id">
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold text-capitalize"
                    :class="[data.type == 3 ? 'error--text' : '']"
                  >
                    {{
                      `${data.user_account.first_name} ${data.user_account.last_name}`
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="text-capitalize pt-2 pb-2 black--text"
                  >
                    {{ data.message }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    >{{ data.created_at | dateFormat }}
                    {{ data.created_at | timeFormat }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  mounted() {
    // this.$store.dispatch("notifications/getNotifications");
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
      data: (state) => state.notifications.data,
      loading: (state) => state.notifications.loading,
    }),
  },
  data() {
    return {};
  },
  methods:{
    fiveNotif(type) {
      if(type == 1){
        const contact = this.data.filter(f => f.type == "3"); 
        return contact
      }
      if(type == 2){
        const contact = this.data.filter(f => f.type != "3"); 

        console.log('hmm',contact);
        return contact
      }
    },
  }
};
</script>
