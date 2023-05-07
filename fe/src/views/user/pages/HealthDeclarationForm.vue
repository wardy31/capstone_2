<template>
  <v-app>
    <v-main class="accent">
      <div v-if="checkDays()">
        <v-container>
          <div class="text-center mt-12">
            <v-avatar size="240" tile>
              <img :src="require('@/assets/relax.svg')" alt="alt" />
            </v-avatar>
            <div class="primary--text mt-4 font-weight-bold text-h5 text-lg-h4">
              Sorry!
            </div>
            <div class="text-body-1 mt-2">
              you are temporarily cannot access this feature.
            </div>
          </div>
        </v-container>
      </div>

      <div v-else>
        <v-container v-if="questionnaires.length == 0 || loading">
          <div class="mx-auto mx-lg-16">
            <v-skeleton-loader type="card" class="mb-12"></v-skeleton-loader>
            <v-skeleton-loader type="card" class="mb-12"></v-skeleton-loader>
            <v-skeleton-loader type="card" class="mb-12"></v-skeleton-loader>
          </div>
        </v-container>

        <v-container>
          <div class="mx-auto mx-lg-16" v-if="exists">
            <h2 class="primary--text font-weight-bold mt-4 mt-lg-12 mb-1">
              Health Declaration Form
            </h2>
            <h5 class="secondary--text">Filled Up Form</h5>

            <v-alert
              type="success"
              color="primary"
              :value="true"
              text
              info
              class="mt-8 text-body-2"
              prominent
              outlined
              dense
            >
              Thank you for submitting your response. The form will be active
              tomorrow.
            </v-alert>

            <div class="d-flex justify-center mt-16 mt-lg-12">
              <v-avatar :size="$vuetify.breakpoint.mobile ? 180 : 260" tile>
                <img src="@/assets/completed.svg" alt="" />
              </v-avatar>
            </div>
            <!-- <v-card
            class="mt-8"
            v-for="existed in existData"
            :key="existed.id"
            :disabled="exists"
          >
            <v-card-title
              class="text-body-1 black--text font-weight-bold text-justify"
            >
              {{ existed.question.question }}
            </v-card-title>
            <v-card-text v-if="existed.question.sub_question">
              <div>
                <ul
                  class="black--text text-body-2 text-capitalize"
                  v-for="splits in existed.question.sub_question.split(',')"
                  :key="splits"
                >
                  <li class="mb-1">{{ splits }}</li>
                </ul>
              </div>
            </v-card-text>
            <v-card-actions>
              <h4 class="mx-4 my-3">
                Answer :
                <b class="ml-2 primary--text">{{
                  existed.answer ? "Yes" : "No"
                }}</b>
              </h4>
            </v-card-actions>
          </v-card>
          <v-btn
            class="text-capitalize mt-12 py-lg-4 py-2 font-weight-bold"
            :block="$vuetify.breakpoint.mobile"
            color="primary"
            :loading="loading"
            @click="edit"
            >Edit Form</v-btn
          > -->
          </div>

          <div class="mx-auto mx-lg-16" v-else>
            <h2 class="primary--text font-weight-bold mt-4 mt-lg-12 mb-1">
              Health Declaration Form
            </h2>
            <h5 class="secondary--text">Filled Up Form</h5>
            <v-card
              class="mt-8"
              v-for="(question, index) in questionnaires"
              :key="question.id"
            >
              <v-card-title
                class="text-body-1 black--text font-weight-bold text-justify"
              >
                {{ question.question }}
              </v-card-title>
              <v-card-text v-if="question.sub_question">
                <div>
                  <ul
                    class="black--text text-body-2 text-capitalize"
                    v-for="splits in question.sub_question.split(',')"
                    :key="splits"
                  >
                    <li class="mb-1">{{ splits }}</li>
                  </ul>
                </div>
              </v-card-text>
              <v-card-actions class="ml-2 mt-n4">
                <v-checkbox
                  label="Yes"
                  @click="questionnaire_id[index] = question.id"
                  v-model="answer[index]"
                  value="true"
                  class="mr-4"
                ></v-checkbox>
                <v-checkbox
                  label="No"
                  @click="questionnaire_id[index] = question.id"
                  v-model="answer[index]"
                  value="false"
                ></v-checkbox>
              </v-card-actions>
            </v-card>

            <v-btn
              class="text-capitalize mt-6 py-6 font-weight-bold"
              block
              color="primary"
              :loading="loading"
              @click="submit"
              >Submit Form</v-btn
            >

            <v-btn
              color="black"
              class="text-capitalize mt-2 font-weight-bold"
              text
              plain
              @click="reset"
              block
              >Reset</v-btn
            >
          </div>
        </v-container>
      </div>
      <v-snackbar v-model="error" color="red" right bottom timeout="2000" app>
        <v-icon left>error</v-icon>
        Please Filled Up All Questions
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { emits } from "@/config/webSocket";
export default {
  // updated(){
  //   if(this.exists){
  //     this.existData.forEach((element,index) => {
  //       console.log('le',element.answer, index);
  //       this.answer.push(element.answer)
  //     });
  //   }
  // },
  async mounted() {
    this.$store.dispatch("followUps/checkFollowUp");
    await this.$store.dispatch("declaration/getQuestions");
    await this.$store.dispatch("declaration/checkExist");
  },
  computed: {
    ...mapState({
      loading: (state) => state.declaration.submit.loading,
      loadingForm: (state) => state.declaration.all.loading,
      questionnaires: (state) => state.declaration.all.data,
      existData: (state) => state.declaration.existForm.data,
      exists: (state) => state.declaration.existForm.exist,
      checkContact: (state) => state.followUps.check.data,
    }),
  },

  data() {
    return {
      answer: [],
      displayAnswer: [],
      questionnaire_id: [],
      error: false,
      all: [],
    };
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
    submitForm() {
      this.$store.dispatch("declaration/submitForm", this.answers);
    },
    async submit() {
      if (this.answer.length == 0) {
        console.log("zero");
        this.error = true;
        return this.answer.length == 0;
      }

      for (const value of this.answer) {
        if (
          value == undefined ||
          value == null ||
          this.questionnaires.length > this.answer.length ||
          this.answer.length == 0
        ) {
          console.log("w");
          this.error = true;
          return null;
        }
      }
      this.answer.forEach((element, index) => {
        this.all.push({
          questionnaire_id: this.questionnaire_id[index],
          answer: element == "true" ? true : false,
        });
      });

      console.log(this.all);
      const res = await this.$store.dispatch(
        "declaration/submitForm",
        this.all
      );
      if (res) {
        emits();
      }
      this.reset();
    },
    edit() {
      this.$store.state.declaration.existForm.exist = false;
    },
    reset() {
      this.all = [];
      this.answer = [];
      this.questionnaire_id = [];
    },
  },
};
</script>
