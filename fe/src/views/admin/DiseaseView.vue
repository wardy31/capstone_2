<template>
  <v-main class="accent">
    <v-container fluid>
      <addDialog
        :dialog="openDialog"
        @handleDialog="openDialog = false"
        @snackBar="snackbar.added = true"
      />
      <updateDiseaseDialog
        :updateData ="updateData"
        :dialog="updateDialog"
        @handleDialog="updateDialog = false"
        @snackBar="snackbar.updatedName = true"
        @handleUpdateData="updateData = null"
      />
      <div class="ma-lg-12">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">
          Diseases Classification
        </h2>
        <h5 class="secondary--text">List of all Diseases</h5>

        <div class="mt-12 pt-6 d-flex justify-space-between">
          <div class="d-flex adj">
            <v-text-field
              class="mr-2"
              label="Search here"
              solo
              dense
              v-model="inputSearch"
            ></v-text-field>
            <v-btn color="primary" @click="handleSearch"
              ><v-icon>search</v-icon></v-btn
            >
          </div>

          <v-btn
            @click="handleDialog"
            color="primary"
            class="px-8 py-5 font-weight-bold"
            ><v-icon left>add</v-icon> Disease</v-btn
          >
        </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">Name</th>
              <th class="text-left black--text text-center">Status</th>
              <th class="text-left black--text text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="disease in diseases"
              :key="disease.id"
              class="text-center text-capitalize"
            >
              <td class="font-weight-bold">
                {{ `${disease.name}` }}
              </td>
              <td
                v-if="disease.is_active"
                class="font-weight-bold success--text"
              >
                Active
              </td>
              <td v-else class="font-weight-bold error--text">Not Active</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      color="primary"
                      @click="handleUpdateDialog(disease)"
                      v-bind="attrs"
                      v-on="on"
                      icon
                      ><v-icon>edit</v-icon></v-btn
                    >
                  </template>
                  <span>Update</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      :disabled="disease.is_active ? true : false"
                      color="primary"
                      @click="changeStatus(disease)"
                      v-bind="attrs"
                      v-on="on"
                      icon
                      ><v-icon>cached</v-icon></v-btn
                    >
                  </template>
                  <span>Change Status</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="text-capitalize"
                      color="error"
                      :disabled="disease.is_active ? true : false"
                      v-bind="attrs"
                      v-on="on"
                      @click="openDeleteDialog(disease)"
                      icon
                      ><v-icon>delete_forever</v-icon></v-btn
                    >
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <!-- <v-pagination v-model="page_number" :length="page" total-visible="6" class="float-left mt-4" @input="pageSwitch"></v-pagination> -->
      </div>
      <!-- Station Delete Dialog -->
      <v-dialog v-model="deleteDialog" width="380">
        <v-card>
          <v-card-title class="primary accent--text"
            >Delete Disease</v-card-title
          >
          <v-card-text>
              <h3 class="font-weight-regular mt-6 mx-8">
                Deleting this data will also be deleted the record of this data. 
                are you sure to delete?
              </h3>
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
            <v-btn
              color="error"
              :loading="loadingDelete"
              class="text-capitalize px-6"
              @click="deleteStation"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="snackbar.added"
        :timeout="2000"
        color="success"
        bottom
        right
      >
        <v-icon>check</v-icon> Added Successfully.
      </v-snackbar>

      <v-snackbar
        v-model="snackbar.delete"
        :timeout="2000"
        color="error"
        bottom
        right
      >
        <v-icon>check</v-icon> Deleted Successfully.
      </v-snackbar>

      <v-snackbar
        v-model="snackbar['updatedStatus']"
        :timeout="2000"
        color="success"
        bottom
        right
      >
        <v-icon>check</v-icon> Active Status Updated Successfully.
      </v-snackbar>

      <v-snackbar
        v-model="snackbar['updatedName']"
        :timeout="2000"
        color="success"
        bottom
        right
      >
        <v-icon>check</v-icon> Active Status Updated Successfully.
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import addDialog from "./Dialog/Disease/DiseaseDialog.vue";
import updateDiseaseDialog from "./Dialog/Disease/UpdateDialog.vue";
export default {
  components: { addDialog,updateDiseaseDialog },
  mounted() {
    this.$store.dispatch("disease/getData");
  },
  computed: {
    ...mapState({
      diseases: (state) => state.disease.all.data,
      loadingDelete: (state) => state.disease.delete.loading,
      // page: (state) => state.station.all.page,
    }),
  },
  data() {
    return {
      openDialog: false,
      updateDialog:false,
      deleteDialog: false,
      stationData: null,
      page_number: 1,
      inputSearch: "",
      updateData:null,
      snackbar: {
        delete: false,
        added: false,
        updatedName: false,
        updatedStatus: false,
      },
    };
  },
  methods: {
    openDeleteDialog(data) {
      this.deleteDialog = true;
      this.stationData = data;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    async deleteStation() {
      const res = await this.$store.dispatch(
        "disease/delete",
        this.stationData
      );
      if (res) {
        this.deleteDialog = false;
        this.snackbar["delete"] = true;
      }
    },
    handleUpdateDialog(data){
        this.updateDialog = true
        this.updateData = data
        console.log(data);
    },
    handleDialog() {
      this.openDialog = true;
    },
    async changeStatus(data) {
      const res = await this.$store.dispatch("disease/status", data);
      if (res) {
        this.snackbar["updatedStatus"] = true;
      }
    },
    pageSwitch(data) {
      this.page_number = data;
      this.$store.dispatch("station/get", data);
    },
    async handleSearch() {
      const res = await this.$store.dispatch(
        "disease/search",
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
