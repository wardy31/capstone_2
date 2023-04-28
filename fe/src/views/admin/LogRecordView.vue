  <template>
  <v-app>
    <v-main class="accent">
      
      <div class="ma-12">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">Log Records</h2>
      <h5 class="secondary--text"> List of all student, personnels or visitors <br> location records</h5>

      <div class="adj mt-8 d-flex">
          <v-select
          outlined dense filled
          label="Location"
          :items="stations"
          :item-value="(item) => item.id"
          :item-text="(item) => item.location.name"
          @change="handleValue"
          ></v-select>
          <!-- <v-text-field  class="mr-2" label="Search here" solo  dense></v-text-field>
          <v-btn color="primary"><v-icon>search</v-icon></v-btn> -->
      </div>
        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text">
                Name
              </th>

              <th class="text-left black--text text-center">
                Location Visited
              </th>


              <!-- <th class="text-left black--text text-center">
                Time Log
              </th> -->

              <!-- <th class="text-left black--text text-center">
                Time-In
              </th> -->

              <!-- <th class="text-left black--text text-center">
                Time-Out
              </th> -->

              <th class="text-left black--text text-center">
                Date
              </th>

              <!-- <th class="text-left black--text text-center"> -->
                <!-- Actions -->
              <!-- </th>        -->
            </tr>
          </thead>

          <tbody>
            <tr v-for="record in records" :key="record.id" class="text-center text-capitalize">
              <td class="text-left">{{`${record.user_account.first_name} ${record.user_account.last_name}`}}</td>
              <td>{{record.location.name}}</td>
              <!-- <td>{{record.time_in}}</td> -->
              <td>{{record.created_at | date}}</td>
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
            <v-pagination v-model="page_number" :length="page" total-visible="6" class="float-left mt-4" @input="pageSwitch"></v-pagination>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment'
export default {
  data(){
    return{
      page_number:1
    }
  },
  filters:{
    date(val){
      return moment(val).format(`MMM. DD, YYYY`).toString()
    } 
  },
  mounted(){
    this.$store.dispatch('record/allRecords')
    this.$store.dispatch('station/get')
  },
  computed:{
    ...mapState({
      records: state => state.record.clinic.data,
      page: state => state.record.clinic.page,
      
      stations: state => state.station.all.data,
    })
  },
  methods:{
    pageSwitch(data){
      this.page_number = data
      this.$store.dispatch('record/allRecords',data)
    },
    handleValue(e){
      this.page_number = 1
      this.$store.dispatch('record/perStation',e)
      console.log('val',e);
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