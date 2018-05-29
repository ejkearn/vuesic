<template>
  <div class="row">
    
      <div class="col-4" v-for="result in list">
        <div class="card" style="">
          <img class="card-img-top" :src="result.artworkUrl100" alt="Card image cap" @click="playPause(result.previewUrl)">
          <div class="card-body">
            <h5 class="card-title">{{result.trackName}}</h5>
            <p class="card-text">{{result.artistName}}</p>
            <p class="card-text">{{result.collectionName}}</p>
            <!-- <audio controls>
              <source :src="result.previewUrl">
            </audio> -->
            <a @click="handleButtonClick(result)" class="btn btn-primary">{{buttonText}}</a>
          </div>
        </div>
      </div>
   
  </div>
</template>

<script>


  export default {
    name: 'songs',
    data(){
      return{
        playing: false,
        currentSongSrc: '',
      }
    },
    props: {
      list: {
        type: Array,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      },
      handleButtonClick: {
        type: Function,
        required: true
      },
      playPause:{
        type: Function,
        required: true
      }
    }
  }

</script>