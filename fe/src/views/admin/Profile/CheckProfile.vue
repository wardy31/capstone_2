<template>
  <v-main class="accent">
    <v-container>
      <div class="ma-12 text-capitalize">
        <div class="mt-2">
          <div class="py-1">
            <v-btn color="primary" rounded text @click="$router.go(-1)"
              ><v-icon left>arrow_back_ios</v-icon>
              <h4>Return</h4></v-btn
            >
          </div>
          <!-- <h2 class="font-weight-bold"><b class="primary--text">{{`${profile.first_name} ${profile.middle_name} ${profile.last_name}`}} </b></h2>
                <h2>Profile</h2> -->
        </div>
        <div class="mb-8 mt-6">
          <v-row align="center">
            <v-col cols="1">
              <v-avatar color="primary" size="94" class="white--text" tile
                ><h3>A</h3></v-avatar
              >
            </v-col>
            <v-col>
              <v-row>
                <v-col class="ml-6">
                  <h3 class="mb-3 primary--text">
                    {{
                      `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
                    }}
                  </h3>
                  <v-row>
                    <v-col cols="3">
                      <h4 class="font-weight-thin">{{ profile.gender }}</h4>
                      <h4 class="font-weight-thin">
                        {{ profile.classification.name }}
                      </h4>
                      <h4 class="font-weight-thin">
                        {{ profile.vaccination_status }}
                      </h4>
                    </v-col>
                    <v-divider vertical inset></v-divider>
                    <v-col cols="4">
                      <h4 class="font-weight-thin">{{ profile.address }}</h4>
                      <h4 class="font-weight-thin">
                        {{ profile.contact_number }}
                      </h4>
                      <h4 class="font-weight-thin">{{ profile.email }}</h4>
                    </v-col>
                    <v-divider vertical inset></v-divider>
                    <v-col>
                      <h4>status :</h4>
                      <h4 class="text-uppercase" :class="checkStatus() ? 'error--text' : 'primary--text'">
                        {{checkStatus() ? "Close Contact" : "No Contact"}}
                      </h4>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>

        <v-divider></v-divider>
        <!-- <v-tabs
            background-color="transparent"
            slider-size="3"
            color="primary"
            class="my-5"
            v-model="tab">
                <v-tab>Health Declaration</v-tab>
                <v-tab>Close Contact</v-tab>
                <v-tab>Stations Visited</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card >
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>1</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>dwd</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>dwd</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-tab-item>
                <v-tab-item>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>dwd</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-tab-item>
                
            </v-tabs-items> -->
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      profile: (state) => state.user.checkProfile.data,
    }),
  },
  data() {
    return {
      tab: 0,
    };
  },
  mounted() {
    this.$store.dispatch("user/checkProfile", this.$route.params.id);
    console.log("reg");
  },
  methods: {
    checkStatus() {
      const patient = this.profile?.user_patient;
      const tagged = this.profile?.user_tagged;

      const patientResult = patient.map((m) => {
        if (m.days_left) {
          return true;
        }
      });

      const taggedResult = tagged.map((m) => {
        if (m.days_left) {
          return true;
        }
      });


      if (patientResult.length || taggedResult.length) {
        return true
      }

      return false
    },
  },
};
</script>

<style scoped></style>
