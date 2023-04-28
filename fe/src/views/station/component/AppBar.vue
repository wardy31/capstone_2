<template>
    <v-app-bar app color="primary">
        <v-app-bar-title class="font-weight-bold white--text">UniTrace</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" text class="text-capitalize font-weight-bold px-8 py-4 mr-4">Records</v-btn>
        <v-btn color="white" outlined class="text-capitalize font-weight-bold px-8 py-4" @click="logout">Logout</v-btn>
        <!-- <h4 class="black--text mr-4 text-capitalize font-weight-regular">Welcome, <b class="font-weight-bold primary--text">{{`${data.username} (${data.location.name})`}}</b></h4>
        <v-menu offset-y bottom transition="slide-y-transition" rounded="lg">
                 <template v-slot:activator="{ on, attrs }">
                <v-avatar color="primary" v-bind="attrs" v-on="on" size="50">A</v-avatar>
                </template>
                <v-list>
                    <v-list-item to="/admin/editprofile">
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">account_circle</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>Edit Profile</h5></v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="logout">
                        <v-list-item-icon class="mr-4"><v-icon  color="primary">logout</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold"><h5>Logout</h5></v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu> -->
    </v-app-bar>
</template>

<script>
export default {
    props:['data'],
    methods:{
        async logout(){
            this.$store.dispatch('user/logout');
            this.$router.push('/station-login')
            localStorage.removeItem('location')
            location.reload()
        }
    }
}
</script>