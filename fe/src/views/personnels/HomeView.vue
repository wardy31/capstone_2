<template>
    <v-app>
        <AppBar/>

        <v-main>
            <v-container>
                <v-row justify="center">
                    <v-col>
                        <v-card>
                            <v-card-title class="primary"></v-card-title>
                            <v-card-text></v-card-text>
                            <v-card-actions>
                                <v-btn block color="primary" outlined>Scan Face</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col>
                        <v-card>
                            <v-card-title class="primary"></v-card-title>
                            <v-card-text></v-card-text>
                            <v-card-actions>
                                <v-btn block color="primary" outlined>Summary Records</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from '@/views/personnels/AppBar.vue'
export default {
    components:{ AppBar},
    data(){
        return{}
    },
}
</script>