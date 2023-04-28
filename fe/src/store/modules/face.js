import * as faceapi from 'face-api.js'

export default {
    namespaced: true,
    state: () => ({
        loading: false,
        loaded: false
    }),
    mutations: {
        loading(state){
            state.loading = true
        },
        load(state){
            state.loading = false
            state.loaded = true
        }
    },
    actions: {
        async load({commit, state}){
            if (!state.loading && !state.loaded) {
                commit('loading')
                return Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                    faceapi.nets.faceExpressionNet.loadFromUri('/models')
                ])
                .then(() => {
                    commit('load')
                    console.log("Loaded")
                    console.log(faceapi.nets)
                })
            }
    
        },
        async run(){
           const videoEl = document.getElementById('inputVideo')
           
            navigator.getUserMedia(
                { video: {} },
                stream => videoEl.srcObject = stream,
                err => console.error(err)
            ) 
            
            videoEl.addEventListener('play', async () => {
                //const canvas = faceapi.createCanvasFromMedia(videoEl)
                const canvas = document.getElementById('canvas')
                const displaySize = {width: videoEl.width, height: videoEl.height}
                faceapi.matchDimensions(canvas,displaySize)
                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                    console.log(detections)

                    const resizedDetections = faceapi.resizeResults(detections,displaySize)
                    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                     faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
                },100)
            })

        }
    },
    getters: {

    }
}