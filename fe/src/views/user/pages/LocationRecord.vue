<template>
  <v-app>
    <v-main class="accent">
    <v-container>
      <div class="ma-16">
        <h2 class="primary--text font-weight-bold mt-12 mb-1">Visited Location Records</h2>
        <h5 class="secondary--text">
          List of your location visited
        </h5>
        <v-card class="mt-12">
          <v-simple-table>
            <thead>
              <tr class="text-center">
                <th class="text-center">Location</th>
                <th class="text-center">Logged In</th>
                <th class="text-center">Date</th>
                <!-- <th>Time-Out</th> -->
                <!-- <th>Duration</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in records" :key="record.id" class="text-center">
                <td>{{record.location.name}}</td>
                <td>{{record.time_in}}</td>
                <td>{{record.created_at | date}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </div>
    </v-container>
  </v-main>
  </v-app>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default{
  mounted(){
    this.$store.dispatch('record/useRecords')
  },
  filters:{
    date(val){
      return moment(val).format('MMM. DD, YYYY')
    }
  },
  computed:{
    ...mapState({
      records: state => state.record.user.data
    })
  }
}
</script>