<template>
  <v-app class="bg">
    <v-main class="bg">
      <div class="ma-12">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">
          Health Declaration Records
        </h2>
        <h5 class="secondary--text">user's health declaration responses</h5>

        <v-row justify="start" class="mt-8">
          <v-col cols="4">
            <v-card class="rounded-lg">
              <v-card-title class="font-weight-bold primary--text"
                >Today Responses</v-card-title
              >
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="d-flex justify-center py-6">
                      <h1 class="teal--text">{{today}}</h1>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="rounded-lg">
              <v-card-title class="font-weight-bold primary--text"
                >Total Responses</v-card-title
              >
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="d-flex justify-center py-6">
                      <h1 class="secondary--text mr-4">{{total}}</h1>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div class="adj mt-12 mb-n3 d-flex">
          <v-text-field
            class="mr-2"
            label="Search here"
            solo
            dense
            v-model="inputSearch"
          ></v-text-field>
          <v-btn color="primary" @click="handleSearch"><v-icon>search</v-icon></v-btn>
        </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr>
              <th class="text-left black--text">Name</th>

              <th class="text-left black--text text-center">Time Submitted</th>

              <th class="text-left black--text text-center">Date Submitted</th>

              <th class="text-left black--text text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              class="text-center"
              v-for="response in responses"
              :key="response.id"
            >
            <td class="text-left font-weight-bold primary--text text-capitalize">
              {{
                `${response.user_account.first_name} ${response.user_account.middle_name} ${response.user_account.last_name}`
              }}
              <div class="secondary--text font-weight-thin">
                {{ response.user_account.classification.name }}
              </div>
            </td>
              <td>{{ response.created_at | filterTime }}</td>
              <td>{{ response.created_at | filterDate }}</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="handleResponse(response.answers)"
                      ><v-icon>description</v-icon></v-btn
                    >
                  </template>
                  <span>Check Form</span>
                </v-tooltip>
                <!-- 
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="error" dark v-bind="attrs" v-on="on" icon><v-icon>delete_forever</v-icon></v-btn>
                    </template>
                      <span>Delete</span>
                  </v-tooltip> -->
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-pagination
          v-model="page_number"
          :length="page"
          class="float-left mt-4"
          @input="pageSwitch"
        ></v-pagination>
      </div>
    </v-main>
    <v-dialog v-model="checkDialog" width="540">
      <v-app-bar color="primary" >
        <v-app-bar-title class="white--text">
          <h5>Response</h5>
        </v-app-bar-title>
      </v-app-bar>
      <v-card v-for="(response,index) in responseData" :key="response.id" tile>
        <v-card-title primary-title class="text-justify">
          <h6>{{ `${index + 1}. ${response.question.question}` }}</h6>
        </v-card-title>

        <v-card-text>
          <ul v-if="response.question.sub_question" class="mt-n4">
            <li v-for="(q,index) in handleQuestion(response.question.sub_question)" :key="index">
              <h4>{{q}}</h4>          
            </li>
          </ul>

          <div class="mt-4">
            <!-- <h4 class="primary--text">Answer: {{response.answer == 1 ? "True" : "False"   }}</h4> -->
            <v-text-field outlined readonly label="Answer" :value="response.answer == 1 ? `Yes` : `No`"></v-text-field>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  mounted() {
    this.$store.dispatch("declaration/getSubmitted");
  },
  filters: {
    filterDate(val) {
      return moment(val).format("MMM DD, YYYY").toString();
    },
    filterTime(val) {
      return moment(val).format("h:mm a").toString();
    },
    subQ(val){
      return val
    }
  },
  computed: {
    ...mapState({
      responses: (state) => state.declaration.responses.data,
      page: (state) => state.declaration.responses.page,
      today: (state) => state.declaration.responses.today,
      total: (state) => state.declaration.responses.total,
    }),
  },
  data() {
    return {
      page_number: null,
      checkDialog: false,
      responseData: null,
      inputSearch:""
    };
  },
  methods: {
    pageSwitch(data) {
      this.page_number = data;
      this.$store.dispatch("declaration/getSubmitted", data);
    },
    handleResponse(data) {
      this.checkDialog = true;
      this.responseData = data;
    },
    handleQuestion(data){
      console.log(data.split(","));
      if(data.trim()){
        const arr = data.split(",")
        return arr
      }
      return []
    },
    handleSearch(){ 
      this.$store.dispatch("declaration/responseSearch", this.inputSearch);
    }
  },
};
</script>

<style scoped>
.bg {
  background-color: whitesmoke;
}
.adj {
  width: 280px;
}
</style>
