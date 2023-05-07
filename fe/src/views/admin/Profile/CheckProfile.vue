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
              <v-avatar color="primary" size="98" class="white--text elevation-3" tile
                >
                <img :src="`${imageUrl}${profile.images_path}`" alt="">
                </v-avatar
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
                      <h4
                        class="text-uppercase"
                        :class="checkStatus() ? 'error--text' : 'primary--text'"
                      >
                        {{ checkStatus() ? "Close Contact" : "No Contact" }}
                      </h4>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>

        <v-divider></v-divider>
        <v-tabs
          background-color="transparent"
          slider-size="3"
          color="primary"
          class="my-5"
          v-model="tab"
        >
          <v-tab>Health Declaration</v-tab>
          <v-tab>Stations Visited</v-tab>
          <v-tab>Follow Ups</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Time Submitted</th>
                    <th>Date Submitted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="detail in details.hdr" :key="detail.id">
                    <td>{{ detail.created_at | time }}</td>
                    <td>{{ detail.created_at | date }}</td>
                    <td>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            icon
                            @click="handleResponse(detail.answers)"
                            ><v-icon>description</v-icon></v-btn
                          >
                        </template>
                        <span>Check Form</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>

          </v-tab-item>
          <v-tab-item>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Location Visited</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="visited in details.visited" :key="visited.id">
                  <td>{{visited.location.name}}</td>
                  <td>{{visited.created_at | time}}</td>
                  <td>{{visited.created_at | date}}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-tab-item>
          <v-tab-item>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Submitted Response</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="followUp in details.followUps" :key="followUp.id">
                  <td>{{followUp.follow_up_status}}</td>
                  <td>{{followUp.created_at | date}}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>
      </div>

      <v-dialog v-model="checkDialog" width="540">
        <v-app-bar color="primary">
          <v-app-bar-title class="white--text">
            <h5>Response</h5>
          </v-app-bar-title>
        </v-app-bar>
        <v-card
          v-for="(response, index) in responseData"
          :key="response.id"
          tile
        >
          <v-card-title primary-title class="text-justify">
            <h6>{{ `${index + 1}. ${response.question.question}` }}</h6>
          </v-card-title>

          <v-card-text>
            <ul v-if="response.question.sub_question" class="mt-n4">
              <li
                v-for="(q, index) in handleQuestion(
                  response.question.sub_question
                )"
                :key="index"
              >
                <h4>{{ q }}</h4>
              </li>
            </ul>

            <div class="mt-4">
              <!-- <h4 class="primary--text">Answer: {{response.answer == 1 ? "True" : "False"   }}</h4> -->
              <v-text-field
                outlined
                readonly
                label="Answer"
                :value="response.answer == 1 ? `Yes` : `No`"
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      profile: (state) => state.user.checkProfile.data,
      details: (state) => state.user.details.data,
    }),
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      tab: 0,
      checkDialog: false,
      responseData: null,
    };
  },
  filters: {
    date(val) {
      return moment(val).format("MMM DD, YYYY").toString();
    },
    time(val) {
      return moment(val).format("h:m A").toString();
    },
  },
  mounted() {
    this.$store.dispatch("user/checkProfile", this.$route.params.id);
    this.$store.dispatch("user/userDetails",this.$route.params.id);
    console.log("reg");
  },
  methods: {
    handleResponse(data) {
      this.checkDialog = true;
      this.responseData = data;

      console.log(data);
    },
    handleQuestion(data){
      if(data.trim()){
        const arr = data.split(",")
        return arr
      }
      return []
    },
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
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped></style>
