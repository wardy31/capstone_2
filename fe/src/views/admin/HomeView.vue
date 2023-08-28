<template>
  <v-main class="accent">
    <v-container fluid>
      <div class="mx-md-16 mx-sm-2">
        <v-container>
          <div>
            <div class="d-flex align-center">
              <div>
                <h2 class="secondary--text">Welcome,</h2>
                <h2 class="primary--text text-uppercase">
                  {{
                    `${user.first_name} ${user.middle_name} ${user.last_name}`
                  }}
                </h2>
                <h4 class="text-uppercase">{{ user.role.name }}</h4>
              </div>
              <img class="d-none d-sm-none d-md-block d-lg-block d-xl-block" :src="require('@/assets/undraw/dashboard.png')" />
            </div>
          </div>
          <v-row justify="start" align="stretch" class="mt-8">
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-card class="rounded-lg">
                <v-card-title class="font-weight-bold primary--text"
                  ><h5>Clinic Staff</h5>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <div class="d-flex align-center justify-center">
                        <h1 class="primary--text mr-4">{{ count.clinic }}</h1>
                        <v-icon size="32">person</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-card class="rounded-lg">
                <v-card-title class="font-weight-bold primary--text"
                  ><h5>Stations</h5></v-card-title
                >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <div class="d-flex justify-center align-center">
                        <h1 class="primary--text mr-4">
                          {{ count.station }}
                        </h1>
                        <v-icon size="32">person_pin</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-card class="rounded-lg">
                <v-card-title class="font-weight-bold primary--text"
                  ><h5>Active Patients</h5></v-card-title
                >
                <v-card-text>
                  <v-row>
                    <v-col>
                      <div class="d-flex align-center justify-center">
                        <h1 class="primary--text mr-4">
                          {{ count.active_patient }}
                        </h1>
                        <v-icon size="32">fact_check</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-8">
            <v-col cols="12" sm="7" md="6" lg="6">
              <div class="mb-3">
                <h3 class="font-weight-bold">
                  Monthly Summary of Classified Contacts
                </h3>
              </div>
              <v-simple-table ref="cont" class="contents">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Patient Name</th>
                      <th class="text-center">Number of Contacts</th>
                      <th class="text-center">Check Contacts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in count.month_contacts" :key="item.id">
                      <td
                        class="text-capitalize font-weight-thin primary--text text-body1"
                      >
                        {{
                          `${item.user_account["first_name"]} ${item.user_account["last_name"]}`
                        }}
                      </td>
                      <td class="text-center font-weight-bold">
                        {{ item.contacts.length }}
                      </td>
                      <td class="text-center font-weight-bold">
                        <v-btn
                          color="primary"
                          icon
                          @click="
                            $router.push(
                              `/admin/manage/viewtrace/${item.user_account.id}/${item.id}`
                            )
                          "
                          ><v-icon>groups</v-icon></v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>

            <v-col cols="12" sm="5" md="6" lg="6">
              <div class="mb-3">
                <h3 class="font-weight-bold">Daily User's Follow Up</h3>
              </div>
              <v-simple-table ref="cont" class="contents">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in count.followUp" :key="item.id">
                      <td
                        class="text-capitalize font-weight-bold primary--text"
                      >
                        {{ item.users.first_name + " " + item.users.last_name }}
                      </td>
                      <td>{{ item.follow_up_status }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import jspdf from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  name: "HomeView",
  mounted() {
    this.$store.dispatch("staff/getCounts");
    this.$store.dispatch("staff/getApproval");
  },
  computed: {
    ...mapState({
      list: (state) => state.staff.all.data,
      count: (state) => state.staff.counts.data,
      user: (state) => state.clinic.credentials.data,
    }),
  },
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
  methods: {
    approve(data) {
      this.$store.dispatch("staff/approval", { data: data, status: true });
    },
    disapprove(data) {
      this.$store.dispatch("staff/approval", { data: data, status: false });
    },
    handleButton() {
      const pdf = new jspdf();
      const msg = "hahah";
      console.log(pdf.getFontList());
      pdf.setFontSize(18).text(`${msg}`, 4, 8);
      autoTable(pdf, {
        headStyles: { fillColor: "red" },
        columns: [
          { header: "Name", dataKey: "name" },
          { header: "Calories (kg)", dataKey: "calories" },
        ],
        body: this.desserts,
      });
      pdf.save("generate.pdf");
    },
  },
};
</script>

<style scoped>
.bg {
  background-color: #f8f0f0;
}
</style>
