  <template>
  <v-app>
    <v-main class="accent">
      
      <div class="ma-12">
      <h2 class="primary--text font-weight-bold mt-12 mb-1">Manage Contacts {{changeBtn ? '' : '/ View'}}</h2>
      <h5>Managing who has been in contact of the user</h5>
      <v-tabs
       class="mt-5"
        v-model="value"
        color="primary"
        slider-color="primary"
        background-color="transparent"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          Check Contacts
        </v-tab>
        <v-tab>
          Trace Contacts
        </v-tab>
      </v-tabs>
        <div v-if="changeBtn" key="true">
        <div class="adj mt-2 pt-6 d-flex mb-n3">
          <v-text-field  class="mr-2" label="Search here" solo outlined dense></v-text-field>
          <v-btn color="primary" class="py-5" ><v-icon>search</v-icon></v-btn>
        </div>
        <v-simple-table class="rounded-lg elevation-6">
          <thead>
            <tr class="text-center">
              <th class="text-left black--text text-center">  
               <h3>Name</h3>
              </th>

              <th class="text-left black--text text-center">
                <h3>Role</h3>
              </th>

              <th class="text-left black--text text-center">
                <h3>Status</h3>
              </th>

              <th class="text-left black--text text-center">
                <h3>Action</h3>
              </th>             
            </tr>
          </thead>

          <tbody>
            <tr class="text-center">
              <td>Eduardo Macabacyao</td>
              <td>Student</td>
              <td><v-chip color="primary"><v-icon left>hdr_weak</v-icon> Good</v-chip></td>
              <td>
                <v-menu offset-y bottom transition="slide-y-transition" rounded="lg">
                 <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" icon large>
                    <v-icon>menu_open</v-icon>
                </v-btn>
                </template>
                <v-list>
                    <v-list-item :to="`/admin/checkprofile/${1}`">
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">account_circle</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>Check Profile</h5></v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="switchs()" >
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">reduce_capacity</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>View Contacts</h5></v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-pagination v-model="page" :length="4" class="float-right mt-4" @input="pageSwitch"></v-pagination>
        </div>
        <div v-else key="false">
           <ViewTraceContact @switchs="switchs()"/>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ViewTraceContact from '@/views/admin/ViewTraceContact.vue'

export default {
    components:{ViewTraceContact},
    data(){
        return{
          docState:'saved',
            changeBtn:true,
            title:'',
            page:1
        }
    },
    methods:{
      switchs(){
          this.changeBtn = !this.changeBtn
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