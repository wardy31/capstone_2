<template>
  <v-container>
    <div class="ma-12">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">
        Manage Close Contacts {{ changeBtn ? "" : "/ View" }}
      </h2>
      <h5 class="secondary--text">
        Managing who has been in contact of the user
      </h5>
      <v-card class="rounded-lg mt-8" width="250">
        <v-card-title class="font-weight-bold primary--text"
          ><h5>Total Active Patient</h5></v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col>
              <div class="d-flex align-center">
                <h1 class="primary--text mr-4">{{ allContacts }}</h1>
                <v-icon size="30">person</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <div class="adj mt-4 pt-6 d-flex mb-n3">
        <v-text-field
          class="mr-2"
          label="Search here"
          solo
          outlined
          dense
          v-model="inputSearch"
        ></v-text-field>
        <v-btn color="primary" class="py-5" @click="handleSearch"
          ><v-icon>search</v-icon></v-btn
        >
      </div>
      <v-simple-table class="rounded-lg elevation-6">
        <thead>
          <tr class="text-center">
            <th class="text-left black--text">
              <h3>Name</h3>
            </th>

            <!-- <th class="text-left black--text ">
              <h3>Role</h3>
            </th> -->

            <th class="text-left black--text">
              <h3>Active Disease</h3>
            </th>

            <th class="text-left black--text text-center">
              <h3>Days left</h3>
            </th>

            <th class="text-left black--text text-center">
              <h3>No. of Contacts</h3>
            </th>

            <th class="text-left black--text text-center">
              <h3>Date Created</h3>
            </th>

            <th class="text-left black--text text-center">
              <h3>Action</h3>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="text-center text-capitalize"
            v-for="contact in contacts"
            :key="contact.id"
          >
            <td class="text-left primary--text font-weight-bold">
              {{
                `${contact.user_account.first_name} ${contact.user_account.middle_name} ${contact.user_account.last_name} `
              }}
              <div class="secondary--text font-weight-thin">
                {{ contact.user_account.classification.name }}
              </div>
            </td>
            <!-- <td class="text-left">{{ contact.user_account.classification.name }}</td> -->
            <td class="text-left">{{ contact.disease.name }}</td>
            <td>
              {{ contact.days_left }}
              {{ (contact.days_left == 1 || contact.days_left == 0) ? "day" : "days" }} left
            </td>
            <td>
              {{
                contact.contacts.length
                  ? contact.contacts.length
                  : "No Contacts"
              }}
            </td>
            <td>
              {{ contact.created_at | dateFormat }}
            </td>
            <td>
              <v-menu
                offset-y
                bottom
                transition="slide-y-transition"
                rounded="lg"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    icon
                    large
                  >
                    <v-icon>menu_open</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    :to="`/admin/checkprofile/${contact.user_account.id}`"
                  >
                    <v-list-item-icon class="mr-4"
                      ><v-icon color="primary"
                        >account_circle</v-icon
                      ></v-list-item-icon
                    >
                    <v-list-item-title class="font-weight-bold"
                      ><h5>Check Profile</h5></v-list-item-title
                    >
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="handleDuration(contact)">
                    <v-list-item-icon class="mr-4"
                      ><v-icon color="primary">timer</v-icon></v-list-item-icon
                    >
                    <v-list-item-title class="font-weight-bold"
                      ><h5>Edit Duration</h5></v-list-item-title
                    >
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    :to="`/admin/manage/viewtrace/${contact.user_account.id}/${contact.id}`"
                  >
                    <v-list-item-icon class="mr-4"
                      ><v-icon color="primary"
                        >reduce_capacity</v-icon
                      ></v-list-item-icon
                    >
                    <v-list-item-title class="font-weight-bold"
                      ><h5>View Contacts</h5></v-list-item-title
                    >
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="handleDeleteDialog(contact)">
                    <v-list-item-icon class="mr-4"
                      ><v-icon color="error">delete</v-icon></v-list-item-icon
                    >
                    <v-list-item-title class="font-weight-bold"
                      ><h5>Delete Patient</h5></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <!-- Edit Duration -->
      <v-dialog
        v-model="durationDialog"
        width="auto"
        @click:outside="closeDialog"
      >
        <v-card>
          <v-card-title class="primary accent--text font-weight-bold"
            >Edit Duration</v-card-title
          >
          <v-card-text class="mt-8">
            <v-text-field
              name="duration"
              label=" Set Duration (Day)"
              v-model="duration"
              id="id"
              outlined
              filled
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              class="text-capitalize"
              text
              plain
              @click="closeDialog"
              >cancel</v-btn
            >
            <v-btn
              color="primary"
              class="text-capitalize"
              :loading="updateLoading"
              @click="handleDurationSubmit"
              >Update</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete -->
      <v-dialog
        v-model="deleteDialog"
        width="auto"
        @click:outside="closeDialog"
      >
        <v-card>
          <v-card-title class="primary accent--text font-weight-bold"
            >Delete Patient</v-card-title
          >
          <v-card-text class="mt-8">
            <div>
              <h3>Are you sure to delete this user ?</h3>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              class="text-capitalize"
              text
              plain
              @click="closeDialog"
              >cancel</v-btn
            >
            <v-btn
              color="error"
              class="text-capitalize"
              :loading="deleteLoading"
              @click="handleSubmitDelete"
              >delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar
        v-model="deleteSnackBar"
        bottom
        right
        color="error"
      >
        <v-icon>check</v-icon>
        Patient Deleted Successfully
      </v-snackbar>
      <v-pagination
        v-model="page_number"
        :length="page"
        class="float-right mt-4"
        @input="pageSwitch"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("closeContact/getPatient");
  },
  filters: {
    dateFormat(val) {
      return moment(val).format("MMM. DD, YYYY").toString();
    },
  },
  computed: {
    ...mapState({
      contacts: (state) => state.closeContact.all.data,
      allContacts: (state) => state.closeContact.all.allContacts,
      page: (state) => state.closeContact.all.page,
      updateLoading: (state) => state.closeContact.update.loading,
      durationDialog: (state) => state.closeContact.update.dialog,
      deleteLoading: (state) => state.closeContact.delete.loading,
    }),
  },
  data() {
    return {
      deleteDialog: false,
      deleteId: false,
      deleteSnackBar: false,
      page_number: 1,
      docState: "saved",
      changeBtn: true,
      title: "",
      duration: "",
      updateId: null,
      inputSearch: "",
    };
  },
  methods: {
    switchs() {
      this.changeBtn = !this.changeBtn;
    },
    handleDuration(data) {
      console.log(data);
      this.duration = data.days_left;
      this.updateId = data.id;
      this.$store.state.closeContact.update.dialog = true;
    },
    closeDialog() {
      this.$store.state.closeContact.update.dialog = false;
      this.deleteDialog = false;
      console.log("closed");
    },
    handleDurationSubmit() {
      this.$store.dispatch("closeContact/updatePatientDuration", {
        id: this.updateId,
        duration: this.duration,
      });
    },
    pageSwitch(data) {
      this.$store.dispatch("closeContact/getPatient", data);
    },
    handleSearch() {
      this.$store.dispatch("closeContact/searchPatient", this.inputSearch);
    },
    handleDeleteDialog(data) {
      this.deleteId = data.id;
      this.deleteDialog = true;
    },
    async handleSubmitDelete() {
      const res = await this.$store.dispatch("closeContact/deletePatient", {
        deleteId: this.deleteId,
      });

      if (res) {
        this.deleteSnackBar = true;
        this.deleteId = null;
        this.deleteDialog = false;
      }
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
