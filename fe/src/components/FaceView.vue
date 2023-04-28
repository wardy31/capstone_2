<template>
    <div>
      <div style="position: relative;" class="margin">
      <canvas id="overlay"/>
      <video id="video" width="720" height="560" autoplay="true" muted ></video>
      <!-- <img :src="require('@/assets/labeled_images/saclay/1.jpg')" alt="eduard" class="ward" id="reference"/> -->
      </div>
  
      <!-- <div style="position: relative;" class="margin">
      <canvas id="overlay1"/>
  
      <img :src="require('@/assets/labeled_images/bagro/1.jpg')" alt="eduard" class="ward" id="input"/>
      <img :src="require('@/assets/labeled_images/macabacyao/1.jpg')" alt="eduard" class="ward" id="input"/>
      </div> -->
      <h4>{{age}} -{{gender}}</h4>
      <v-btn large @click="detectFace()">Detect Face</v-btn>
      <v-btn large to="/">back</v-btn>
      <img id="myImg" src=""/> -->
      <v-btn large @click="ed()">url</v-btn>
    </div>
  </template>
  
  <script>
  import * as faceapi from 'face-api.js'

  export default {
    name: 'FaceView',
    props: {
      msg: String
    },
    data(){
      return{
        age:null,
        gender:null,
        expression:'',
      }
    },
    mounted(){
      this.run()
      this.startVideo()
      
      const video = document.getElementById('video')
      const canvas = document.getElementById('overlay')
      const displaySize = {width: video.width,height:video.height}
      faceapi.matchDimensions(canvas, displaySize)

        video.addEventListener('playing',() =>{
        setInterval(async () => {
          const detections = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
          console.log(detections)
          const resizedDetections  =faceapi.resizeResults(detections,displaySize)
          canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.width)
          //faceapi.draw.drawDetections(canvas, resizedDetections)
          if(detections){
            //clearInterval(inter);
            const labeledDescriptors = await this.loadLabeledImages()
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors,0.60)
            const bestMatch = faceMatcher.findBestMatch(detections.descriptor)
                console.log(bestMatch.toString())
        const drawOptions = {
          label: `${bestMatch.toString()} -- Olray`,
          lineWidth: 2
        }
            const drawBox = new faceapi.draw.DrawBox(resizedDetections.detection.box, drawOptions)
            drawBox.draw(canvas)           
          }
        }, 1000);
      })
    },
    methods:{
      ed(){
        const x = document.getElementById('video')

        x.stop();
      },
      async run(){
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/weights')
        await faceapi.nets.faceRecognitionNet.loadFromUri('/weights')
        await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
        await this.loadLabeledImages()
      },
      async startVideo(){
        navigator.mediaDevices.getUserMedia({video:{}})
        .then(function(stream){
          // eslint-disable-next-line no-undef
          video.srcObject = stream
        })
        .catch(err =>{
          console.log(err)
        })
      },
      async face(){
        const video = document.getElementById('video')
        video.addEventListener('playing',() =>{
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
  
          if(detections.length){
            console.log('Nc one')
          }
          console.log(detections)
        }, 1000);
      })
      },
      async detectFace(){
        //const image = document.getElementById('input')
        //const refe = document.getElementById('reference')
        const image = document.getElementById('video')
        //const result1 = await faceapi.detectSingleFace(refe).withFaceLandmarks().withFaceDescriptor()
        const result = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
        const displaySize = { width: image.width, height: image.height }
        //onst displaySize1 = { width: refe.width, height: refe.height }
  
        const canvas = document.getElementById('overlay') //video 
        //const canvas1 = document.getElementById('overlay1')
  
        await faceapi.matchDimensions(canvas, displaySize)
        //await faceapi.matchDimensions(canvas1, displaySize1)
        
        const labeledDescriptors = await this.loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors,0.60)
        // resize the detected boxes in case your displayed image has a different size than the original
        const resizedDetections = await faceapi.resizeResults(result, displaySize)
        //const resizedDetections1 = await faceapi.resizeResults(result1, displaySize1)
        // draw detections into the canvas
        await faceapi.draw.drawDetections(canvas, resizedDetections)
        //await faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
       // await faceapi.draw.drawDetections(canvas1, resizedDetections1)
        //const detection = await faceapi.detectSingleFace(image).withAgeAndGender().withFaceExpressions().withFaceLandmarks().withFaceDescriptor()
        console.log('result',result)
  
  
        if (result) {
        const bestMatch = faceMatcher.findBestMatch(result.descriptor)
        console.log(bestMatch.toString())
        const drawOptions = {
          label: `${bestMatch.toString()} -- Olray`,
          lineWidth: 2
        }
        const drawBox = new faceapi.draw.DrawBox(resizedDetections.detection.box, drawOptions)
        drawBox.draw(canvas)

        alert(bestMatch)
      }
        
  
        // this.age = detection.age
        // this.expression = detection.expressions
        // this.gender = detection.gender
      },
     loadLabeledImages(){
        const labels = ['bagro','macabacyao','saclay']

        return Promise.all(
            labels.map(async label =>{
                const descriptions = []
                for(let i = 1; i <= 2 ; i++){
                  const image = await faceapi.fetchImage(`https://raw.githubusercontent.com/wardy31/wardy31.github.io/master/src/assets/labeled_images/${label}/${i}.jpg`)
                  // const image = await faceapi.fetchImage(`http://localhost:8000/storage/labeled_images/${label}/${i}.jpg`)
                    const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
                    console.log('loop',detection)
                    descriptions.push(detection.descriptor)
                }
                console.log('loaded',descriptions)
                return new faceapi.LabeledFaceDescriptors(label,descriptions)
            })
        )
      },
      async view(){

         const image = await faceapi.fetchImage('https://raw.githubusercontent.com/wardy31/wardy31.github.io/master/src/assets/labeled_images/bagro/1.jpg')

        //  const json = await faceapi.fetchJson(jsons)
//          fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });
         console.log(image)
      
      }
  
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .ward{
    height: 100%;
    width: 500px;
  }
  
  canvas{
    position:absolute;
  }
  </style>
  