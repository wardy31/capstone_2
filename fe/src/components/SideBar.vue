<template>
<v-navigation-drawer app width="240" color="primary" flat dark :value="dialog">
       <div class="text-left mb-10 mt-4 d-flex align-center">
          <h2 class="ml-3 white--text">UniTrace.</h2>
       </div>
      <v-list
        dense
        nav
      >
        <v-list-item-group mandatory color="warning">
            <v-list-item to="/admin/dashboard" class="py-1">
                <v-list-item-icon>
                    <v-icon>dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>

            <v-list-group :value="false" no-action color="warning" class="py-1">
              <template v-slot:activator>
                <v-list-item-icon><v-icon>account_tree</v-icon></v-list-item-icon>
                <v-list-item-title>Manage <br> Contacts</v-list-item-title>
              </template>

              <v-list-item to="/admin/manage/check-users" class="py-1">
                <v-list-item-title>Trace Contacts</v-list-item-title>
              </v-list-item>

              <v-list-item to="/admin/manage/contact-user" class="py-1">
                <v-list-item-title>Monitor Users</v-list-item-title>
                <!-- <v-list-item-title>User Close Contacts</v-list-item-title> -->
              </v-list-item>

              <v-list-item to="/admin/manage/follow-ups" class="py-1">
                <v-list-item-title>Follow Ups</v-list-item-title>
              </v-list-item>
            </v-list-group>
            
            <v-list-item to="/admin/manage-form" class="py-1"> 
              <v-list-item-icon><v-icon>description</v-icon></v-list-item-icon>
              <v-list-item-title>Manage Form</v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin/station" class="py-1"> 
              <v-list-item-icon><v-icon>location_on</v-icon></v-list-item-icon>
              <v-list-item-title>Stations</v-list-item-title>
            </v-list-item>

            <v-list-group :value="false" no-action color="warning" class="py-1">
              <template v-slot:activator>
                <v-list-item-icon><v-icon>history_edu</v-icon></v-list-item-icon>
                <v-list-item-title>Records</v-list-item-title>
              </template>
              
              <v-list-item to="/admin/declarationform" class="py-1">
                <v-list-item-title>Health Declaration <br> Records</v-list-item-title>
              </v-list-item>

              <v-list-item to="/admin/logrecords" class="py-1">
                <v-list-item-title>Station Records</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-item to="/admin/manage-diseases" class="py-1"> 
              <v-list-item-icon><v-icon>coronavirus</v-icon></v-list-item-icon>
              <v-list-item-title>Disease Classification</v-list-item-title>
            </v-list-item>


            <v-list-item to="/admin/personnels" class="py-1"> 
              <v-list-item-icon><v-icon>group</v-icon></v-list-item-icon>
              <v-list-item-title>Clinic Staffs</v-list-item-title>
            </v-list-item>
         
            <v-list-item to="/admin/reportgeneration">
                <v-list-item-icon>
                    <v-icon>file_copy</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Generate Report</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
    name:'SideBar',
    props:['dialog'],
    data(){
      return{
        model: 1
      }
    }
}
</script>