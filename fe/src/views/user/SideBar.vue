<template>
    <v-navigation-drawer app width="250" color="primary" flat dark>
    
           <div class="text-left mb-8 mt-2 d-flex align-center">
              <h3 class="pl-5 mt-4 white--text">Unitrace</h3>
           </div>
          <v-list
            nav
            dense
          >
            <v-list-item-group  mandatory color="warning">
                <v-list-item to="/user/home" class="py-1">
                    <v-list-item-icon>
                        <v-icon>home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
    
                <v-list-item to="/user/personal-profile/" class="py-1"> 
                  <v-list-item-icon><v-icon>person</v-icon></v-list-item-icon>
                  <v-list-item-title>Personal Profile</v-list-item-title>
                </v-list-item>
                 
                <v-list-item to="/user/location-record" class="py-1"> 
                  <v-list-item-icon><v-icon>history_edu</v-icon></v-list-item-icon>
                  <v-list-item-title>Visited Location <br> Records</v-list-item-title>
                </v-list-item>
            
                <v-list-item to="/user/health-declaration-form">
                    <v-list-item-icon>
                        <v-icon>file_copy</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Health Declaration</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
          </v-list>
    
        </v-navigation-drawer>
    </template>
    
    <script>
    export default {
        name:'SideBar',
        data(){
          return{
            model: 1
          }
        }
    }
    </script>