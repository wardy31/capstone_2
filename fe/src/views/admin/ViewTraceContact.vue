<template>
  <v-container>
    <div class="ma-16">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">
        View Close Contacts
      </h2>
      <h5 class="secondary--text">List of user close contacts</h5>

      <div class="d-flex align-center mt-12">
        <v-btn color="primary" @click="changeBtn()" rounded small
          ><v-icon left>arrow_back</v-icon>
          <h4>return</h4></v-btn
        >
        <h2 class="ml-4 text-capitalize">
          {{ `${user.first_name} ${user.middle_name} ${user.last_name}` }}
        </h2>
      </div>

      <!-- <div class="d-flex align-stretch mt-12">
            <v-select label="Time Frame" outlined  filled dense></v-select>
            <v-select label="Location" outlined  filled dense class="ml-2"></v-select>
            <v-btn color="primary" class="ml-2 py-5" medium text><v-icon left>filter_list</v-icon> <h4>Filter</h4></v-btn>
        </div> -->

      <v-card class="rounded-lg elevation-6 mt-6">
        <v-simple-table>
          <thead>
            <tr class="text-center">
              <th class="text-left black--text ">
                <h3>Name</h3>
              </th>

              <!-- <th class="text-left black--text ">
                <h3>Role</h3>
              </th> -->

              <th class="text-left black--text ">
                <h3>Active Disease</h3>
              </th>

              <th class="text-center black--text ">
                <h3>Days Left</h3>
              </th>
              <th class="text-center black--text ">
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
              <!-- <td class="text-left">
                {{ contact.user_account.classification.name }}
              </td> -->

              <td class="text-left text-capitalize">
                {{ contact.disease.name }}
              </td>

              <td>{{ contact.days_left }} {{(contact.days_left == 1 || contact.days_left == 0)  ? "day" : "days" }} left</td>

              <td class="text-center">
                {{
                  contact.created_at | dateFormat
                }}
              </td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      @click="handleDuration(contact)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      large
                      ><v-icon>timer</v-icon></v-btn
                    >
                  </template>
                  <span>Edit Duration</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="error"
                      @click="handleDelete(contact)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      large
                      ><v-icon>delete_forever</v-icon></v-btn
                    >
                  </template>
                  <span>Remove User</span>
                </v-tooltip>
              </td>
              <!-- <td>2:00 pm</td>
              <td>4:00 pm</td> -->
              <!-- <td><v-chip color="primary"><v-icon left>hdr_weak</v-icon> Good</v-chip></td> -->
              <!-- <td>
                <v-menu offset-y bottom transition="slide-y-transition" rounded="lg">
                 <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" icon large>
                    <v-icon>menu_open</v-icon>
                  </v-btn>
                </template>
                <v-list>
                    <v-list-item to="/admin/checkprofile">
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">account_circle</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>Check Profile</h5></v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">connect_without_contact</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>Mark as close contact</h5></v-list-item-title>
                    </v-list-item> -->
              <!-- <v-list-item>
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">6_ft_apart</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>Mark as possible close contact</h5></v-list-item-title>
                    </v-list-item> -->
              <!-- </v-list>
                </v-menu> -->
              <!-- </td> -->
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
      <!-- <v-pagination
        v-model="page"
        :length="4"
        class="float-right mt-4"
        @input="pageSwitch"
      ></v-pagination> -->

      <!-- Update Duration Dialog -->
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
            <v-btn color="primary" class="text-capitalize" :loading="updateLoading" @click="handleDurationSubmit">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete user -->
      <v-dialog
        v-model="deleteDialog"
        width="auto"
        @click:outside="closeDialog"
      >
        <v-card>
          <v-card-title class="primary accent--text font-weight-bold"
            >Remove User</v-card-title
          >
          <v-card-text class="py-6">
            <div class="pr-12 text-h6">Are you sure to remove?</div>
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
            <v-btn color="error" class="text-capitalize" :loading="deleteLoading" @click="handleDeleteSubmit()">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapState } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("user/checkProfile", this.$route.params.id);
    this.$store.dispatch(
      "closeContact/getContacts",
      this.$route.params.patientId
    );
  },
  filters:{
    dateFormat(val){
      return moment(val).format('MMM. DD, YYYY').toString()
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.checkProfile.data,
      contacts: (state) => state.closeContact.all.data,
      durationDialog: (state) => state.closeContact.update.dialog,
      deleteDialog: (state) => state.closeContact.delete.dialog,
      deleteLoading: state => state.closeContact.delete.loading,
      updateLoading: state => state.closeContact.update.loading
    }),
  },
  data() {
    return {
      page: 1,
      duration: "",
      deleteId:'',
      updateId:''
    };
  },
  methods: {
    changeBtn() {
      this.$router.go(-1);
    },
    handleDuration(data) {
      console.log(data);
      this.duration = data.days_left;
      this.updateId = data.id
      this.$store.state.closeContact.update.dialog = true;
    },
    handleDelete(data) {
      console.log('handle', data.id);
      this.deleteId = data.id
      this.$store.state.closeContact.delete.dialog = true;
    },
    closeDialog() {
      this.$store.state.closeContact.update.dialog = false;
      this.$store.state.closeContact.delete.dialog = false;
    },
    handleDurationSubmit() {
      this.$store.dispatch('closeContact/updateTaggedDuration',{id:this.updateId,duration:this.duration,paramId:this.$route.params.patientId})
    },
    handleDeleteSubmit() {
      this.$store.dispatch('closeContact/deleteTagged',{deleteId:this.deleteId,paramId:this.$route.params.patientId})
    },
  },
};
</script>
