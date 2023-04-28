<template>
    <div>
         <div class="mt-2 pt-6 mb-n6">
            <v-row>
                <v-col cols="4">
                    <v-select label="Covid Carrier" solo dense outlined ></v-select>
                </v-col>

                <v-col cols="2">
                    <v-select label="Location" solo dense outlined></v-select>                    
                </v-col>

                <v-col cols="2">
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="Picker without buttons" prepend-inner-icon="event" readonly v-bind="attrs" v-on="on" outlined solo dense ></v-text-field>
                    </template>
                      <v-date-picker v-model="date" @input="menu = false" ></v-date-picker>
                  </v-menu>              
                </v-col>

                <v-col cols="2">
                  <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="time" label="Time" prepend-inner-icon="schedule" readonly v-bind="attrs" v-on="on" outlined solo dense></v-text-field>
                    </template>
                    <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
                  </v-menu>
                </v-col>

                <v-col>
                   <v-btn color="primary"><v-icon>search</v-icon></v-btn>
                </v-col>
            </v-row>
        </div>

        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">
                Check
              </th>
              <th class="text-left black--text text-center">
                Name
              </th>

              <th class="text-left black--text text-center">
                Location
              </th>

              <th class="text-left black--text text-center">
                Time
              </th>

              <th class="text-left black--text text-center">
                Date
              </th>

              <th class="text-left black--text text-center">
                Actions
              </th>             
            </tr>
          </thead>

          <tbody>
            <tr class="text-center">
              <td class="d-flex justify-center align-center">
                <v-checkbox  v-model="selected" value="John"></v-checkbox>
              </td>
              <td>Eduardo Macabacyao</td>
              <td>MIS</td>
              <td>10:30</td>
              <td>08 </td>
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


<script>
export default {
  data(){
    return{
      menu:false,
      menu2:false,
      date:'',
      time:''
    }
  }
}
</script>