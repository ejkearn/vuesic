<template>
  <div class="Home, container-fluid">
    <!-- start of search bar -->
    <div class="row">
      <div class="col">
        <form @submit.prevent="getResults">
          <input type="text" v-model="query">
          <button type="sumbit">Search</button>
        </form>
      </div>
    </div>
    <!-- end of search bar -->
    <div class="row">
      <div class="col-3">
        <!-- playlist goes here -->
        <playlistSongs :playPause="playPause" :list="playlist" buttonText="Remove" :handleButtonClick="removeFromPlaylist" :upSongPosition="upSongPosition" :downSongPosition="downSongPosition"></playlistSongs>        
      </div>
      <!-- start of card -->
      <div class="col-9">
        <!-- <div class="row"> -->
        <songs :list="results"  buttonText="Add" :handleButtonClick="addToPlaylist" :playPause="playPause"></songs>
        <!-- <div v-for="result in results">
        <div class="col-2">
          <div class="card" style="width: 10rem;">
            <img class="card-img-top" :src="result.artworkUrl100" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{result.trackName}}</h5>
              <p class="card-text">{{result.artistName}}</p>
              <p class="card-text">{{result.collectionName}}</p>
              <audio controls>
                  <source :src="result.previewUrl">
                </audio>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div> -->
        <!-- </div> -->
      </div>
      <!-- end of card -->


    </div>
  </div>
</template>

<script>
  import songs from "./list.vue"
  import playlistSongs from "./playlistSong.vue"

  export default {
    name: '',
    components: {
      songs,
      playlistSongs
    },
    data() {
      return {
        query: '',
        term: '',
        playlistId: '5b073b341b2f615a5805a3d2',
        song: {},
        playing: false,
        currentSongSrc: '',
      }
    },
    computed: {
      results() {
        return this.$store.state.results
      },
      playlist() {
        return this.$store.state.playlist
      },
      playlist2(){
        return this.$store.state.playlist2
      }
    },
    methods: {
      playPause(src){
        this.$store.dispatch('playPause', src)
      },

      getResults() {
        this.$store.dispatch('getResults', this.query)
        this.term = this.query,
          this.query = ''
      },
      getPlaylist() {
        this.$store.dispatch('getPlaylist')
      },
      addToPlaylist(songObj) {
        // this.getPlaylist()
        this.$store.dispatch('addToPlaylist', songObj)
        // this.getPlaylist()
   
      }, 

      removeFromPlaylist(SongId){
        this.$store.dispatch('removeFromPlaylist', SongId._id)
      },

      upSongPosition(songId){
        this.$store.dispatch('upSongPosition', songId._id)
      },
      downSongPosition(songId){
        this.$store.dispatch('downSongPosition', songId._id)
      },

    },
    beforeMount(){
      this.getPlaylist()
    }
  }

</script>

<style>
  .card {
    /* width: 15rem; */
    /* max-height: 25rem; */
  }
</style>