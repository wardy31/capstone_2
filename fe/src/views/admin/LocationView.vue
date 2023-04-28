  <template>
  <v-app>
    <v-main class="bg">
      <v-container class="ma-auto">   

      <div class="text-h4 font-weight-bold mt-12 mb-8">
        Locations
      </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">
                Location
              </th>

              <th class="text-left black--text text-center">
                Actions
              </th>             
            </tr>
          </thead>

          <tbody>
            <tr class="text-center">
              <td>Library</td>
              <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="teal" dark v-bind="attrs" v-on="on" icon><v-icon>update</v-icon></v-btn>
                    </template>
                      <span>Update</span>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>


export default {
}
</script>


<style scoped>
.bg{
  background-color: #e4e4e4;
}
</style>