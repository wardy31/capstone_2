<template>
  <v-main class="accent">
    <v-container fluid>
      <addDialog />
      <div v-if="roleData">
        <UpdateRoleDialogVue :role="roleData" @reset="reset" />
      </div>
      <div class="mx-md-16 mx-sm-2">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">Clinic Staffs</h2>
        <h5 class="secondary--text">List of all Clinics</h5>

        <div class="mt-12 pt-6 d-flex justify-space-between">
          <div class="d-flex adj">
            <v-text-field
              v-model="inputSearch"
              class="mr-2"
              label="Search here"
              solo
              dense
            ></v-text-field>
            <v-btn color="primary" @click="handleSearch"
              ><v-icon>search</v-icon></v-btn
            >
          </div>

          <v-btn
            @click="handleDialog"
            color="primary"
            class="px-8 py-5 font-weight-bold"
            ><v-icon left>add</v-icon> Staff</v-btn
          >
        </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">Name</th>
              <th class="text-left black--text text-center">Username</th>
              <th class="text-left black--text text-center">Role</th>
              <th class="text-left black--text text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="clinic in user"
              :key="clinic.id"
              class="text-center text-capitalize"
            >
              <td>
                {{
                  `${clinic.first_name} ${clinic.middle_name} ${clinic.last_name}`
                }}
              </td>
              <td>{{ clinic.username }}</td>
              <td>{{ clinic.role.name }}</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      @click="handleRole(clinic)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      ><v-icon>admin_panel_settings</v-icon></v-btn
                    >
                  </template>
                  <span>Change Role</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="error"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="openDeleteDialog(clinic)"
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
        <v-pagination
          v-model="page_number"
          :length="page"
          total-visible="6"
          class="float-left mt-4"
          @input="pageSwitch"
        ></v-pagination>
      </div>
      <!-- Personnel Delete Dialog -->
      <v-dialog v-model="deleteDialog" width="auto">
        <v-card>
          <v-card-title class="primary accent--text"
            >Delete Personnel</v-card-title
          >
          <v-card-text>
            <v-container>
              <h2 class="font-weight-regular mt-4">Are you sure to Delete?</h2>
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
            <v-btn
              color="error"
              class="text-capitalize px-6"
              @click="deleteStaff"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import UpdateRoleDialogVue from "./Dialog/Staff/UpdateRoleDialog.vue";
import addDialog from "./Dialog/Staff/AddDialog.vue";
export default {
  components: { addDialog, UpdateRoleDialogVue },
  updated() {
    if (!this.dialog) {
      this.reset();
    }
  },
  mounted() {
    this.$store.dispatch("staff/staffs");
    this.reset();
  },
  computed: {
    ...mapState({
      user: (state) => state.staff.staffs.data,
      page: (state) => state.staff.staffs.page,
      dialog: (state) => state.staff.role.dialog,
    }),
  },
  data() {
    return {
      roleData: null,
      deleteDialog: false,
      personnelData: null,
      page_number: 1,
      inputSearch: "",
    };
  },
  methods: {
    openDeleteDialog(data) {
      this.deleteDialog = true;
      this.personnelData = data;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    deleteStaff() {
      this.$store.dispatch("staff/delete", this.personnelData);
      this.deleteDialog = false;
    },
    handleDialog() {
      console.log("wdd");
      this.$store.state.staff.submit.dialog = true;
    },
    handleRole(data) {
      console.log("data", data);
      this.roleData = data;
      this.$store.state.staff.role.dialog = true;
    },
    reset() {
      this.roleData = null;
    },
    pageSwitch(data) {
      this.page_number = data;
      this.$store.dispatch("staff/staffs", data);
    },
    handleSearch() {
      this.$store.dispatch("staff/search", this.inputSearch);
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
