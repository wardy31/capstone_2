<template>
  <v-app>
    <v-main class="accent">
      <div class="mx-auto mx-lg-16">
        <v-container>
          <div>
            <div class="d-lg-flex align-center">
              <div>
                <h2 class="secondary--text">Welcome,</h2>
                <h2 class="primary--text text-capitalize">
                  {{ `${user.first_name} ${user.last_name}` }}
                </h2>
                <v-chip
                  label
                  color="primary"
                  class="font-weight-bold mt-2 px-6 text-capitalize"
                >
                  <div>{{ user.classification.name }}</div>
                </v-chip>
              </div>
              <!-- <img :src="require('@/assets/undraw/home.png')" class="ml-8" /> -->
            </div>
          </div>

          <v-row justify="start" align="end" class="mt-8">
            <v-col sm="12" md="4" lg="4">
              <v-card class="rounded-md">
                <v-card-title class="font-weight-bold primary--text"
                  >Contact Status</v-card-title
                >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <div class="d-flex justify-center">
                        <h2 class="error--text mr-4 my-6" v-if="checkDays()">
                          Close Contact
                        </h2>
                        <h2 class="success--text mr-4 my-6" v-else>
                          No Contact
                        </h2>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- announcecment -->
          <h2 class="primary--text mt-10 mb-4">Bulletin Board</h2>
          <v-card width="480" color="transparent" flat>
            <div v-if="checkDays()">
              <v-alert
                type="success"
                color="primary"
                outlined
                text
                prominent
                :value="true"
                v-if="checkContact.followUp"
              >
                <div class="text-body-2">
                  The <b>Daily Follow Up</b> was submitted. Please comeback
                  tommorow to filled up. Thank You.
                </div>
              </v-alert>

              <v-card width="620" class="mb-6 elevation-4" v-else>
                <v-card-title class="primary--text">
                  <div class="text-body-1 font-weight-bold">
                    Follow Up Daily
                  </div>
                </v-card-title>
                <v-card-text>
                  <div class="text-body-2">
                    Good Day, you have
                    <b
                      class="primary--text"
                      v-if="checkContact.data[0].user_patient.length"
                      >{{
                        checkContact.data[0].user_patient.length
                          ? checkContact.data[0].user_patient[0].days_left +
                            " days left "
                          : ""
                      }}</b
                    >
                    <b class="primary--text" v-else>{{
                      checkContact.data[0].user_tagged.length
                        ? checkContact.data[0].user_tagged[0].days_left +
                          " days left "
                        : ""
                    }}</b>
                    to self quarantine.
                    <br />
                    please follow up daily to monitor your if/has symptoms.
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    class="mb-2 ml-2 px-4 text-capitalize"
                    small
                    @click="followUp"
                    ><v-icon left>send</v-icon> Follow Up</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>

            <div v-else>
              <v-alert
                type="success"
                color="primary"
                outlined
                prominent
                text
                :value="true"
                v-if="checkContact.healthDeclaration"
              >
                <div class="text-body-2">
                  The <b>Health Declaration Form</b> was submitted. You can now
                  enter the campus. have a nice day and keep safe.
                </div>
              </v-alert>
              <v-card width="620" class="mb-6 elevation-4" v-else>
                <v-card-title class="primary--text">
                  <div class="text-body-1 font-weight-bold">
                    Health Declaration Form
                  </div>
                </v-card-title>
                <v-card-text>
                  <div class="text-body-2">
                    Fill up your health declaration form when entering the
                    campus. (required)
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    to="/user/health-declaration-form"
                    class="mb-2 ml-2 px-7 text-capitalize"
                    small
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
    checkDays() {
      let taggedHasDays = false;
      let patientHasDays = false;

      for (const iterator of this.checkContact.data[0]?.user_tagged) {
        if (iterator.days_left != 0) {
          taggedHasDays = true;
        }
      }

      for (const iterator of this.checkContact.data[0]?.user_patient) {
        if (iterator.days_left != 0) {
          patientHasDays = true;
        }
      }

      return taggedHasDays || patientHasDays;
    },
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
