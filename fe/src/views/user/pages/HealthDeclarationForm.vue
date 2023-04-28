<template>
  <v-app>
  <v-main class="accent">
    <div v-if="checkContact.data.length">
      <v-container>
        <div class="text-center mt-12 ">
            <v-avatar
              height="280"
              width="600"
              tile
            >
              <img :src="require('@/assets/undraw/alert1.png')" alt="alt">
            </v-avatar> 
           <h1 class="primary--text mt-8">Sorry!</h1>
           <h3>you are temporarily cannot access this feature.</h3>
        </div>
      </v-container>
    </div>
    
    <div v-else>
      <v-container v-if="questionnaires.length == 0 || loading">
        <div class="ma-16">
          <v-skeleton-loader type="card" class="mb-12"></v-skeleton-loader>
          <v-skeleton-loader type="card" class="mb-12"></v-skeleton-loader>
          <v-skeleton-loader type="card" class="mb-12"></v-skeleton-loader>
        </div>
      </v-container>

      <v-container>
        <div class="ma-16" v-if="exists">
          <h2 class="primary--text font-weight-bold mt-12 mb-1">
            Health Declaration Form
          </h2>
          <h5 class="secondary--text">Filled Up Form</h5>

          <v-alert type="info" :value="true" text info class="mb-n7 mt-5">
            Editing the form will be available within 24 hours.
          </v-alert>
          <v-card
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
            class="text-capitalize mt-6 py-6 font-weight-bold"
            block
            color="primary"
            :loading="loading"
            @click="edit"
            >Edit Form</v-btn
          >
        </div>

        <div class="ma-16" v-else>
          <h2 class="primary--text font-weight-bold mt-12 mb-1">
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
            <v-card-actions>
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
      Please Filled Up All Question
      <v-btn @click.native="error = false" small outlined class="ml-4"
        >Close</v-btn
      >
    </v-snackbar>
  </v-main>
</v-app>
</template>

<script>
import { mapState } from "vuex";

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
    submitForm() {
      this.$store.dispatch("declaration/submitForm", this.answers);
    },
    submit() {
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

      this.$store.dispatch("declaration/submitForm", this.all);
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
