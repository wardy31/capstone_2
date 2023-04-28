<template>
  <v-container>
    <div class="ma-12">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">Trace Contacts</h2>
      <h5 class="secondary--text">Trace User's Contacts</h5>

      <!-- <div v-if="loading">loading..</div> -->

      <div>
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
              
              <th class="text-left black--text">
                <h3>Department</h3>
              </th>

              <th class="text-left black--text text-center">
                <h3>Action</h3>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="text-center text-capitalize"
            >
              <td class="text-left font-weight-bold primary--text">
                {{ `${user.first_name} ${user.middle_name} ${user.last_name}` }}
                <div class="secondary--text font-weight-thin">
                  {{ user.classification.name }}
                </div>
              </td>
              
              <td class="text-left text-uppercase font-weight-bold">
                <div class="mb-1 text-primary">
                  {{ user.department }}
                </div>
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
                    <v-list-item :to="`/admin/checkprofile/${user.id}`">
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
                    <v-list-item :to="`/admin/manage/trace-user/${user.id}`">
                      <v-list-item-icon class="mr-4"
                        ><v-icon color="primary"
                          >reduce_capacity</v-icon
                        ></v-list-item-icon
                      >
                      <v-list-item-title class="font-weight-bold"
                        ><h5>Trace Contacts</h5></v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-pagination
          v-model="page_number"
          :length="page"
          class="float-right mt-4"
          @input="pageSwitch"
        ></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      users: (state) => state.user.all.data,
      page: (state) => state.user.all.page,
      loading: (state) => state.user.all.loading,
    }),
  },
  mounted() {
    this.$store.dispatch("user/getAllUser");
  },
  data() {
    return {
      page_number: 1,
      docState: "saved",
      changeBtn: true,
      title: "",
      inputSearch: "",
    };
  },
  methods: {
    pageSwitch(data) {
      // this.changeBtn = !this.changeBtn;
      this.page_number = data;
      this.$store.dispatch("user/getAllUser", data);
    },
    handleSearch() {
      this.$store.dispatch("user/userSearch", this.inputSearch);
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
