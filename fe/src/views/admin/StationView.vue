<template>
  <v-main class="accent">
    <v-container fluid>
      <addDialog />
      <div class="mx-md-16 mx-sm-2">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">
          Stations Account
        </h2>
        <h5 class="secondary--text">List of all Stations Account</h5>

        <div class="mt-12 pt-6 d-flex justify-space-between">
          <div class="d-flex adj">
            <v-text-field
              class="mr-2"
              label="Search here"
              solo
              dense
              v-model="inputSearch"
            ></v-text-field>
            <v-btn color="primary" @click="handleSearch"><v-icon>search</v-icon></v-btn>
          </div>

          <v-btn
            @click="handleDialog"
            color="primary"
            class="px-8 py-5 font-weight-bold"
            ><v-icon left>add</v-icon> Station</v-btn
          >
        </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">Username</th>
              <th class="text-left black--text text-center">Location</th>
              <th class="text-left black--text text-center">Status</th>
              <th class="text-left black--text text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="station in user"
              :key="station.id"
              class="text-center text-capitalize"
            >
              <td>
                {{ `${station.username}` }}
              </td>
              <td>{{ station.location.name }}</td>
              <td
                v-if="station.is_active"
                class="font-weight-bold primary--text"
              >
                Active
              </td>
              <td v-else class="font-weight-bold error--text">Not Active</td>
              <td>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   class="text-capitalize" color="primary" @click="changeStatus(station)" dark v-bind="attrs" v-on="on" icon ><v-icon>cached</v-icon></v-btn>
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
                      @click="openDeleteDialog(station)"
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
        <v-pagination v-model="page_number" :length="page" total-visible="6" class="float-left mt-4" @input="pageSwitch"></v-pagination>
      </div>
    <!-- Station Delete Dialog -->
    <v-dialog v-model="deleteDialog" width="auto" >
        <v-card>
          <v-card-title class="primary accent--text">Delete Station</v-card-title>
          <v-card-text>
            <v-container>
              <h3 class="font-weight-regular mt-6 mx-8">Are you sure to Delete?</h3>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" plain text class="text-capitalize" @click="closeDeleteDialog">Cancel</v-btn>
            <v-btn color="error" class="text-capitalize px-6" @click="deleteStation">Delete</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import addDialog from "./Dialog/Station/AddDialog.vue";
export default {
  components: { addDialog },
  mounted() {
    this.$store.dispatch("station/get");
  },
  computed: {
    ...mapState({
      user: (state) => state.station.all.data,
      page: (state) => state.station.all.page,
    }),
  },
  data(){
    return{
      deleteDialog:false,
      stationData:null,
      page_number:1,
      inputSearch:""
    }
  },
  methods: {
    openDeleteDialog(data){
      this.deleteDialog = true
      this.stationData = data
    },
    closeDeleteDialog(){
      this.deleteDialog = false
    },
    deleteStation() {
      this.$store.dispatch("station/delete", this.stationData);
      this.deleteDialog = false
    },
    handleDialog() {
      this.$store.state.station.submit.dialog = true;
    },
    changeStatus(data){
      this.$store.dispatch("station/changeStatus",data);
    },
    pageSwitch(data){
      this.page_number = data
      this.$store.dispatch("station/get",data);
    },
    async handleSearch(){
      const res = await this.$store.dispatch("station/search",this.inputSearch);      

      console.log('res',res);
    }
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
