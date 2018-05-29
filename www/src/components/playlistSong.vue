<template>
  <div class="row">
    <div v-for="result in list">
      <div class="col">
        <div class="card" style="">
          <img class="card-img-top" :src="result.artworkUrl100" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{result.trackName}}</h5>
            <p class="card-text">{{result.artistName}}</p>
            <p class="card-text">{{result.collectionName}}</p>
            <audio controls>
              <source :src="result.previewUrl">
            </audio>
            <button v-if="!list.indexOf(result) == 0" @click="upSongPosition(result)">move up</button>
            <button v-if="!(list.indexOf(result) == (list.length - 1))" @click="downSongPosition(result)">move down</button>
            <button @click="handleButtonClick(result)" class="btn btn-primary">{{buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'playlsitSongs',
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
      upSongPosition:{
        type: Function,
        required: true
      },
      downSongPosition:{
        type: Function,
        required: true
      }
    }
  }

</script>