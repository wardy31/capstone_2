  <template>
  <v-app>
    <v-main class="bg">
      
      <div class="ma-16">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">Users</h2>
      <h5> List of all Registered Users</h5>

      <div class="adj mt-16 pt-6 d-flex">
          <v-text-field  class="mr-2" label="Search here" solo  dense></v-text-field>
          <v-btn color="primary"><v-icon>search</v-icon></v-btn>
      </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">
                Name
              </th>

              <th class="text-left black--text text-center">
                Vaccination Status
              </th>

              <th class="text-left black--text text-center">
                Covid Status
              </th>

              <th class="text-left black--text text-center">
                Actions
              </th>             
            </tr>
          </thead>

          <tbody>
            <tr class="text-center">
              <td>Eduardo Macabacyao</td>
              <td>Vaccinated</td>
              <td>Negative</td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </v-simple-table>
         <v-pagination v-model="page" :length="4" class="float-left mt-4" @input="pageSwitch"></v-pagination>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      page:1
    }
  }
}
</script>


<style scoped>
.bg{
  background-color: #f8f0f0;
}
.adj{
  width: 280px;
}

</style>