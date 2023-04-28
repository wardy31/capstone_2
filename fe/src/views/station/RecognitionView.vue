<template>
  <v-app>
    <v-main class="primary">
      <v-container>
        <div class="ma-16">
          <v-card width="480" class="mx-auto px-6 rounded-lg">
            <v-card-title class="font-weight-bold"
              >{{ user.location.name }} Station</v-card-title
            >
            <v-card-text class="mx-auto">
              <div style="position: relative" class="margin">
                <canvas id="overlay" />
                <video
                  :class="{ 'd-none': hide }"
                  class="rounded-lg"
                  id="video"
                  autoplay="true"
                  muted
                ></video>
              </div>

              <h4 class="black--text mt-4">
                User Visited Today : <b class="primary--text">{{visitor.length}}</b>
              </h4>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                class="font-weight-bold py-6 mb-6 mt-n2"
                block
                ><v-icon left large class="mr-6">center_focus_strong</v-icon>
                Recognize Now</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import * as faceapi from "face-api.js";

export default {
  async mounted() {
    this.$store.dispatch('match/getVisitedUser',this.user.location_id)
    await this.run();
    await this.loadLabeledImages();
    await this.getLabeledDescriptors();
    await this.startVideo();
    await this.startDetection();
    await console.log("description", this.descriptors[0]);
  },
  computed: {
    ...mapState({
      user: (state) => state.station.credentials.user,
      playing:(state) => state.match.matching.playing,
      visitor:(state) => state.match.all.data,
    }),
  },
  data() {
    return {
      hide: false,
      play: true,
      descriptors: [],
    };
  },
  methods: {
    async run() {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/weights");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/weights");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/weights");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/weights");
      console.log(faceapi.nets);
    },
    async startVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then(async function (stream) {
          // eslint-disable-next-line no-undef
          video.srcObject = stream;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getLabeledDescriptors() {
      const labels = await this.loadLabeledImages();
      await this.descriptors.push(labels);
    },
    loadLabeledImages() {
      const labels = ["bagro", "macabacyao", "saclay"];

      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];
          for (let i = 1; i <= 2; i++) {
            const image = await faceapi.fetchImage(
              `https://raw.githubusercontent.com/wardy31/wardy31.github.io/master/src/assets/labeled_images/${label}/${i}.jpg`
            );
            // const image = await faceapi.fetchImage(`http://localhost:8000/storage/labeled_images/${label}/${i}.jpg`)
            const detection = await faceapi
              .detectSingleFace(image)
              .withFaceLandmarks()
              .withFaceDescriptor();
            console.log("loop", detection);
            descriptions.push(detection.descriptor);
          }
          console.log("loaded", descriptions);
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    },
    startDetection() {
      console.log("start again");
      const video = document.getElementById("video");

      video.addEventListener("playing", () => {
        setInterval(async () => {
          if (this.playing) {
            const detections = await faceapi
              .detectSingleFace(video)
              .withFaceLandmarks()
              .withFaceDescriptor();
            console.log(detections);

            if (detections) {
              console.log("stop");
              // clearInterval();
              this.match(detections);
            }
          }

          console.log('end');
        }, 1000);
      });
    },
    async match(detections) {
      // const labeledDescriptors = await this.loadLabeledImages();
      const faceMatcher = new faceapi.FaceMatcher(this.descriptors[0]);
      const bestMatch = faceMatcher.findBestMatch(detections.descriptor);

      console.log('slice',bestMatch.toString().split("").reverse().join("").slice(6))
      const again = bestMatch.toString().split("").reverse().join("").slice(6)

      if(again.split("").reverse().join("") != "unknown"){
        await this.$store.dispatch('match/matchUser',{location_id:this.user.location_id,user_id:again.split("").reverse().join("")})
        console.log('again',again.split("").reverse().join(""));
        console.log('match');
      }
    }
  },
};
</script>

<style scoped>
.ward {
  height: 100%;
  width: 500px;
}

canvas {
  position: absolute;
}

video {
  height: auto;
  width: 100%;
}
</style>
