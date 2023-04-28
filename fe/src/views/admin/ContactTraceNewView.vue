<template>
    <div>
         <div class="mt-2 pt-6 mb-n3 d-flex adj">
            <v-select label="Covid Carrier" class="mr-2" solo dense outlined ></v-select>
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
    </div>
</template>

<style scoped>
.bg{
  background-color: #f8f0f0;
}
.adj{
  width: 320px;
}

</style>