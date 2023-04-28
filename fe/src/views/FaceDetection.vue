<template>
    <v-app>
        <v-app-bar color="primary" app ><v-btn icon dark large><v-icon>arrow_back</v-icon></v-btn></v-app-bar>

        <v-main class="bg">
            <v-container>
                <v-card width="340" class="ma-auto elevation-10 rounded-lg">

                    <div class="mx-8 py-12">
                    <div class="d-flex justify-center ">
                        <video  id="inputVideo" width="280" height="280" autoplay muted></video>
                        <canvas id="canvas"/>
                    </div>

                    <div>
                        <v-btn color="primary" block rounded class="font-weight-bold" @click="train">Start Detection</v-btn>
                    </div>
                    </div>
                </v-card>   
            </v-container>             
        </v-main>
    </v-app>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
    },
    methods:{
        async train(){
            this.$store.dispatch('face/run')
        }
    } 
}
</script>

<style scoped>
.bg{
    background-color: #f8f0f0;
}

#canvas{
  position: absolute;
}
</style>