<template>
  <v-container>
    <div class="ma-12">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">Follow Ups</h2>
      <h5 class="secondary--text">
        List of all student, personnels or visitors
        respondents.
      </h5>

      <v-card class="rounded-lg mt-8" width="290">
        <v-card-title class="font-weight-bold primary--text"
          >Today's Respondent</v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col>
              <div class="d-flex my-4">
                <h2 class="secondary--text mr-4"><b class="primary--text mr-2">{{followData.tcount}}</b> out of <b  class="primary--text ml-2 font-weight-bold">{{followData.acontact}}</b></h2>
                <v-icon>person</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
<!-- 
      <div class="adj mt-16 pt-6 d-flex">
        <v-text-field
          class="mr-2"
          label="Search here"
          solo
          dense
        ></v-text-field>
        <v-btn color="primary"><v-icon>search</v-icon></v-btn>
      </div> -->

      <v-simple-table class="rounded-lg elevation-6 mt-8">
        <thead>
          <tr class="text-center">
            <th class="text-left black--text">Name</th>

            <th class="text-left black--text">Submitted Response</th>

            <th class="text-left black--text text-center">Date</th>

            <!-- <th class="text-left black--text text-center">
                  Time-In
                </th> -->

            <!-- <th class="text-left black--text text-center">
                  Time-Out
                </th> -->

            <!-- <th class="text-left black--text text-center">Date</th> -->

            <!-- <th class="text-left black--text text-center"> -->
            <!-- Actions -->
            <!-- </th>        -->
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="follow in followData.data.data"
            :key="follow.id"
            class="text-center text-capitalize"
          >
            <td class="text-left">
              {{
                `${follow.users.first_name} ${follow.users.last_name}`
              }}
            </td>
            <td class="text-left">{{ follow.follow_up_status }}</td>
            <td>{{ follow.created_at | date }}</td>
            <!-- <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on" icon><v-icon>visibility</v-icon></v-btn>
                      </template>
                        <span>View</span>
                    </v-tooltip>
  
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="error" dark v-bind="attrs" v-on="on" icon><v-icon>delete_forever</v-icon></v-btn>
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </td> -->
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
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      page_number: 1,
    };
  },
  filters: {
    date(val) {
      return moment(val).format(`MMM. DD, YYYY`).toString();
    },
  },
  mounted() {
    this.$store.dispatch("record/allRecords");
    this.$store.dispatch('followUps/allFollowUp')
  },
  computed: {
    ...mapState({
      records: (state) => state.record.clinic.data,
      page: (state) => state.followUps.all.page,
      followData: state => state.followUps.all.data
    }),
  },
  methods: {
    pageSwitch(data) {
      this.page_number = data;
      this.$store.dispatch('followUps/allFollowUp',data)
      console.log('pag',data);
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
