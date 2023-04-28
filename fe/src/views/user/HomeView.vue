<template>
  <v-app>
    <v-main class="accent">
      <div class="mx-16">
        <v-container>
          <div>
            <div class="d-flex align-center">
              <div>
                <h2 class="secondary--text">Welcome,</h2>
                <h2 class="primary--text text-capitalize">
                  {{ `${user.first_name} ${user.last_name}` }}
                </h2>
                <v-chip
                  label
                  color="primary"
                  class="font-weight-bold mt-2 text-capitalize"
                  ><div>{{ user.classification.name }}</div></v-chip
                >
              </div>
              <img :src="require('@/assets/undraw/home.png')" class="ml-8" />
            </div>
          </div>

          <v-row justify="start" align="end" class="mt-8">
            <v-col cols="4">
              <v-card class="rounded-md">
                <v-card-title class="font-weight-bold primary--text"
                  >Contact Status</v-card-title
                >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <div class="d-flex justify-center">
                        <h2 class="success--text mr-4 my-6">No Contact</h2>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- announcecment -->
          <h2 class="primary--text mt-10 mb-4">Announcements</h2>
          <v-card width="620" color="transparent" flat>

            <div v-if="checkContact.data.length">
              <v-alert
                type="success"
                color="primary"
                outlined
                text
                :value="true"
                v-if="checkContact.followUp"
              >
                The <b>Daily Follow Up</b> was submitted. Please comeback
                tommorow to filled up. Thank You.
              </v-alert>

              <v-card width="620" class="mb-6 elevation-4" v-else>
                <v-card-title class="primary--text"
                  ><h4>Follow Up Daily</h4></v-card-title
                >
                <v-card-text>
                  <div class="text-body-1">
                    Good Day, you have 
                    <b class="primary--text">{{checkContact.data[0].user_patient.length ? checkContact.data[0].user_patient[0].duration +  ' days left ': '' }}</b> to self quarantine.
                    <br />
                    please follow up daily to monitor your if/has
                    symptoms.
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    rounded
                    color="primary"
                    class="mb-2 ml-2 px-4 text-capitalize"
                    @click="followUp"
                    ><v-icon left>send</v-icon> Follow Up</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>

            <div v-else>
            <v-alert type="success" color="primary" outlined text :value="true" v-if="checkContact.healthDeclaration">
              The <b>Health Declaration Form</b> was submitted. You can now
              enter the campus. have a nice day and keep safe.
            </v-alert>
              <v-card width="620" class="mb-6 elevation-4" v-else>
                <v-card-title class="primary--text"
                  ><h4>Health Declaration Form</h4></v-card-title
                >
                <v-card-text>
                  <div class="text-body-1">
                    Fill up your health declaration form when entering the
                    campus. (required)
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    outlined
                    color="primary"
                    to="/user/health-declaration-form"
                    rounded
                    class="mb-2 ml-2 px-6 text-capitalize"
                    >Fill Up</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </v-card>
          <followUpDialogVue />
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import followUpDialogVue from "./dialogs/followUpDialog.vue";

export default {
  name: "HomeView",
  components: { followUpDialogVue },
  mounted() {
    this.$store.dispatch("followUps/checkFollowUp");
  },
  computed: {
    ...mapState({
      user: (state) => state.user.credentials.data,
      checkContact: (state) => state.followUps.check.data,
    }),
  },
  methods: {
    followUp() {
      this.$store.state.followUps.all.dialog = true;
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #f8f0f0;
}
</style>
