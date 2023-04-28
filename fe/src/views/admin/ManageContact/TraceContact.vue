<template>
  <v-container>
    <div class="ma-12">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">Trace Contacts</h2>
      <h5 class="secondary--text">Trace User's Contacts</h5>

      <div class="d-flex align-center mt-6">
        <v-btn color="primary" @click="changeBtn()" rounded small
          ><v-icon left>arrow_back</v-icon>
          <h4>return</h4></v-btn
        >
        <h2 class="ml-4 text-capitalize">
          {{ `${user.first_name} ${user.middle_name} ${user.last_name}` }}
        </h2>
      </div>

      <div class="d-flex align-stretch mt-6">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filterSubmit.date"
              label="Date Started"
              prepend-inner-icon="event"
              outlined
              filled
              dense
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="filterSubmit.date"
            @input="handleDate"
          ></v-date-picker>
        </v-menu>
        <!-- <v-select label="Time Frame" outlined filled dense></v-select> -->
        <v-select
          label="Location"
          v-model="filterSubmit.location"
          prepend-inner-icon="location_on"
          :loading="locationLoading"
          :disabled="locationLoading"
          :items="location"
          item-text="name"
          item-value="id"
          outlined
          filled
          dense
          class="ml-2"
        ></v-select>
        <v-btn
          color="primary"
          class="ml-2 py-5"
          medium
          text
          :loading="visitedLoading"
          @click="handleFilter"
          ><v-icon left>filter_list</v-icon>
          <h4>Filter</h4></v-btn
        >
      </div>

      <!-- <div class="adj mt-4 pt-6 d-flex mb-n3">
        <v-text-field
          class="mr-2"
          label="Search here"
          solo
          outlined
          dense
        ></v-text-field>
        <v-btn color="primary" class="py-5"><v-icon>search</v-icon></v-btn>
      </div> -->
      <div class="d-flex justify-end">
        <v-btn
          color="primary"
          :loading="contactLoading"
          class="text-capitalize mb-2"
          :class="[validate() ? `d-none` : ``]"
          @click="submitSelected"
          >Submit Selected Contact</v-btn
        >
      </div>
      <v-simple-table class="rounded-lg elevation-6">
        <thead>
          <tr class="text-left">
            <th>
              <v-checkbox
                v-model="checkBox.checkAll"
                @click="handleCheck"
              ></v-checkbox>
            </th>
            <th class="black--text">
              <h3>Name</h3>
            </th>

            <th class="text-center black--text">
              <h3>Location Visited</h3>
            </th>

            <th class="text-center black--text">
              <h3>Time In</h3>
            </th>

            <th class="text-center black--text">
              <h3>Date</h3>
            </th>
            <!-- <th class="text-center black--text">
              <h3>Time Out</h3>
            </th>

            <th class="text-center black--text text-center">
              <h3>Total Time</h3>
            </th>
             -->

            <th class="text-center black--text">
              <h3>Action</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center text-capitalize"
            v-for="(visited, index) in visiteds"
            :key="visited.id"
            :class="
              visited.user_account.user_tagged.length ||
              visited.user_account.user_patient.length
                ? `d-none`
                : 'white'
            "
          >
            <td class="text-center">
              <v-checkbox
                v-model="checkBox.checkBoxes[index]"
                :value="visited.user_account.id"
              ></v-checkbox>
            </td>
            <td class="text-left font-weight-bold primary--text">
              {{
                `${visited.user_account.first_name} ${visited.user_account.middle_name} ${visited.user_account.last_name}`
              }}
              <div class="secondary--text font-weight-thin">
                {{ visited.user_account.classification.name }}
              </div>
            </td>
            <td>{{ visited.location.name }}</td>
            <td>{{ visited.created_at | filterTime }}</td>
            <td>{{ visited.created_at | filterDate }}</td>
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
                  <v-list-item :to="`/admin/checkprofile/${2}`">
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
                  <v-list-item @click="markContact(visited)">
                    <v-list-item-icon class="mr-4"
                      ><v-icon color="primary"
                        >reduce_capacity</v-icon
                      ></v-list-item-icon
                    >
                    <v-list-item-title class="font-weight-bold"
                      ><h5>Mark As Close Contact</h5></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <!-- <v-pagination
        v-model="page"
        :length="4"
        class="float-right mt-4"
        @input="pageSwitch"
      ></v-pagination> -->
      <v-snackbar
        v-model="snackBar"
        timeout="2000"
        color="success"
        bottom
        right
      >
        <v-icon class="pr-2">check</v-icon>
        User classified as close contact.
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  mounted() {
    this.$store.dispatch("user/checkProfile", this.$route.params.id);
    this.$store.dispatch(
      "traceContact/getVisitedLocation",
      this.$route.params.id
    );
    this.$store.dispatch("location/get");
  },
  filters: {
    filterDate(val) {
      return moment(val).format("MMM. DD,YYYY").toString();
    },
    filterTime(val) {
      return moment(val).format("h:m:ss a").toString();
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.checkProfile.data,
      visiteds: (state) => state.traceContact.all.data,
      contactLoading: (state) => state.traceContact.selected.loading,
      visitedLoading: (state) => state.traceContact.all.loading,
      location: (state) => state.location.all.data,
      locationLoading: (state) => state.location.all.loading,
    }),
  },
  data() {
    return {
      checkBox: {
        checkAll: false,
        checkBoxes: [],
      },
      docState: "saved",
      snackBar:false,
      title: "",
      page: 1,
      menu: false,
      filterSubmit: {
        location: "",
        date: "",
        id: this.$route.params.id,
      },
    };
  },
  methods: {
    validate() {
      const filtered = this.checkBox.checkBoxes.filter((f) => {
        return f != null;
      });

      return filtered.length ? false : true;
    },
    async submitSelected() {
      const filtered = this.checkBox.checkBoxes.filter((f) => {
        return f != null;
      });

      const res = await this.$store.dispatch("traceContact/submitCheckSelected", {
        id: this.$route.params.id,
        data: {
          selected:filtered
        },
      });

      if(res){
        this.checkBox.checkBoxes = [];
      }
      console.log("hehe", res);
    },
    handleCheck() {
      console.log("hehe", this.checkBox.checkAll);
      this.checkBox.checkBoxes = [];

      if (this.checkBox.checkAll) {
        for (const select of this.visiteds) {
          this.checkBox.checkBoxes.push(select.user_account.id);
        }
      }
    },
    handleSubmitCheck() {},
    changeBtn() {
      this.$router.go(-1);
    },
    handleFilter() {
      this.$store.dispatch(
        "traceContact/filterVisitedRecord",
        this.filterSubmit
      );
    },
    handleDate(data) {
      console.log(data);
      this.filterSubmit.location = "";
      this.menu = false;
    },
    markContact(user) {
      const submit = {
        tag: user.user_account_id,
        patient: this.$route.params.id,
        filter: this.filterSubmit,
      };
      this.$store.dispatch("traceContact/submitContact", submit);
      console.log(submit);
    },
  },
};
</script>
