<template>
  <v-main class="accent">
    <v-container fluid>
      <addDialog
        :dialog="dialog.add"
        @handleDialog="dialog.add = false"
        @snackBar="snackBar['store'] = true"
      />
      <updateDialog
        :dialog="dialog['update']"
        :updateData = "updateData"
        @handleUpdateData = "updateData = null"
        @handleDialog = "dialog['update'] = false"
        @snackBar="snackBar['update']  = true"
      />
      <div class="ma-lg-12">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">Manage Form</h2>
        <h5 class="secondary--text">List of Health Declaration Form</h5>

        <div class="mt-4 pt-6 d-flex justify-end mb-6">
          <!-- <div class="d-flex adj">
              <v-text-field
                class="mr-2"
                label="Search here"
                solo
                dense
                v-model="inputSearch"
              ></v-text-field>
              <v-btn color="primary" @click="handleSearch"><v-icon>search</v-icon></v-btn>
            </div> -->

          <v-btn
            @click="handleDialog"
            color="primary"
            class="px-8 py-2 font-weight-bold"
            ><v-icon left>add</v-icon> Question</v-btn
          >
        </div>

        <v-card
          v-for="question in questions"
          :key="question.id"
          class="mb-4 rounded-lg"
        >
          <v-card-title class="font-weight-bold primary--text">Question</v-card-title>
          <v-card-text>
            <div class="text-body-1 font-weight-bold black--text">
              {{ question.question }}
            </div>
            <div class="mt-2">
              <ul v-if="question.sub_question">
                <li
                  v-for="(list, index) in questionSplit(question.sub_question)"
                  :key="index"
                >
                  {{ list }}
                </li>
              </ul>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-tooltip bottom >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="text-capitalize mr-2"
                  color="primary"
                  @click="handleUpdateDialog(question)"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon>article</v-icon> Update Form</v-btn
                >
              </template>
              <span>update form</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="text-capitalize"
                  color="error"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="openDeleteDialog(question)"
                  ><v-icon>delete_forever</v-icon> Delete</v-btn
                >
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
        <!-- <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text">Questions</th>
              <th class="text-left black--text">Sub List</th>
              <th class="text-left black--text text-center">Status</th>
              <th class="text-left black--text text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="question in questions"
              :key="question.id"
              class="text-center text-capitalize"
            >
              <td class="text-left text-justify py-4">
                {{ `${question.question}` }}
              </td>
              <td class="text-left text-justify py-4">
                <ul v-if="question.sub_question">
                  <li
                    v-for="(list, index) in questionSplit(
                      question.sub_question
                    )"
                    :key="index"
                  >
                    {{ list }}
                  </li>
                </ul>
              </td>
              <td class="">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      color="primary"
                      @click="changeStatus(question)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      ><v-icon>article</v-icon></v-btn
                    >
                  </template>
                  <span>Change Status</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      color="error"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="openDeleteDialog(question)"
                      icon
                      ><v-icon>delete_forever</v-icon></v-btn
                    >
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </v-simple-table> -->
        <!-- <v-pagination
          v-model="page_number"
          :length="page"
          total-visible="6"
          class="float-left mt-4"
          @input="pageSwitch"
        ></v-pagination> -->
      </div>
      <!-- Station Delete Dialog -->
      <v-dialog v-model="deleteDialog" width="auto">
        <v-card>
          <v-card-title class="primary accent--text"
            >Delete Station</v-card-title
          >
          <v-card-text>
            <v-container>
              <h3 class="font-weight-regular mt-6 mx-8">
                Are you sure to Delete?
              </h3>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              plain
              text
              class="text-capitalize"
              @click="closeDeleteDialog"
              >Cancel</v-btn
            >
            <v-btn color="error" :loading="deleteLoading" class="text-capitalize px-6" @click="deleteForm">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackBar.store" color="success" bottom right>
        <v-icon>check</v-icon> Form Added Successfully
      </v-snackbar>

      <v-snackbar v-model="snackBar.update" color="success" bottom right>
        <v-icon>check</v-icon> Form Updated Successfully
      </v-snackbar>

      <v-snackbar v-model="snackBar.delete" color="error" bottom right>
        <v-icon>check</v-icon> Form Deleted Successfully
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import addDialog from "./Dialog/Form/AddDialog.vue";
import updateDialog from "./Dialog/Form/UpdateDialog.vue";

export default {
  components: { updateDialog,addDialog },
  mounted() {
    this.$store.dispatch("questions/getData");
  },
  computed: {
    ...mapState({
      questions: (state) => state.questions.all.data,
      deleteLoading:(state) => state.questions.delete.loading
    }),
  },
  data() {
    return {
      dialog: {
        add: false,
        update:false
      },
      updateData:null,
      deleteDialog: false,
      formData: null,
      page_number: 1,
      inputSearch: "",
      snackBar: {
        update: false,
        store: false,
        delete: false,
      },
    };
  },
  methods: {
    questionSplit(data) {
      const split = data.split(",");

      return split;
    },
    openDeleteDialog(data) {
      this.deleteDialog = true;
      this.formData = data;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    async deleteForm() {
      const res = await this.$store.dispatch("questions/delete", this.formData);
      if (res) {
        this.deleteDialog = false;
        this.snackBar['delete'] = true
      }
    },
    handleDialog() {
      this.dialog["add"] = true;
    },
    handleUpdateDialog(data){
      this.updateData = data
      this.dialog['update'] = true
    },
    changeStatus(data) {
      this.$store.dispatch("station/changeStatus", data);
    },
    pageSwitch(data) {
      this.page_number = data;
      this.$store.dispatch("station/get", data);
    },
    async handleSearch() {
      const res = await this.$store.dispatch(
        "station/search",
        this.inputSearch
      );

      console.log("res", res);
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #f8f0f0;
}
.adj {
  width: 280px;
}
</style>
