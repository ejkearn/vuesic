import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import axios from 'axios'

var endURL = '&media=music'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//kanban.herokuapp.com/' : '//localhost:3000/api/lists/';
let playlistapi = axios.create({
  baseURL: baseUrl + 'api',
  timeout: 2000,
  withCredentials: true
})

let api = axios.create({
  baseURL: 'https://itunes.apple.com/search?term=',
  timeout: 3000
})


vue.use(vuex)

export default new vuex.Store({
  state: {
    playing: false,
    currentSong: new Audio(),
    playlist: [],
    playlist2: [],
    results: [],
    playlistId: '5b0ae96beeb83d47045dfd39',
    testSong: {

      "title": "title3",
      "album": "album3",
      "artist": "artist3",
      "songUrl": "URL3",
      "imgUrl": "URL3"
    }

  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },

    setPlaylist(state, playlist) {
      state.playlist = playlist
    },

    addToPlaylist(state, songObj) {
      // var temp = []
      // temp = state.playlist
      // temp.push(songObj)
      // state.playlist = temp
      // temp = []
      state.playlist.push(songObj)
    },

    setPlaylistId(state, playlistId) {
      state.playlistId = playlistId
    },

    removeFromPlaylist(state, songId) {
      for (let i = 0; i < state.playlist.length; i++) {
        if (state.playlist[i]._id == songId) {
          state.playlist.splice(i, 1)
        }
      }
    },

    upSongPosition(state, songId){
      for (let i = 0; i < state.playlist.length; i++) {
        var song = state.playlist[i]
        var elem = JSON.parse(JSON.stringify(song))
        if (song._id == songId){
    
          
          state.playlist.splice(i, 1)
          state.playlist.splice(i-1, 0, elem)
         return
        }
      }
    },

    downSongPosition(state, songId){
      for (let i = 0; i < state.playlist.length; i++) {
        var song = state.playlist[i]
  
        if (song._id == songId){
          var elem = JSON.parse(JSON.stringify(song))
          state.playlist.splice(i, 1)
          state.playlist.splice(i+1, 0, elem)
          return
        }
      }
    }

  },
  actions: {
    //get search results
    getResults({ dispatch, commit }, query) {
      api.get(query + endURL)
        .then(res => {
          console.log(res.data.results)
          commit('setResults', res.data.results)
        }).catch(err => alert(err))
    },

    //get playlist
    getPlaylist({ dispatch, commit, state }, ) {
      playlistapi.get(state.playlistId)
        .then(res => {
          console.log(res.data)
          commit('setPlaylist', res.data.songs)
        }).catch(err => alert(err))
    },

    //set playlist Id
    setPlaylistId({ dispatch, commit }, playlistId) {
      commit('setPlaylistId', playlistId)
    },

    //create Playlist not finished
    createNewPlaylist({ dispatch, commit }, newPlaylist) {
      playlistapi.post('', {name: newPlaylist})
    },

    //add a song to the bottom of playlist
    addToPlaylist({ dispatch, commit, state }, song) {
      var songObj = {
        trackName: song.trackName,
        collectionName: song.collectionName,
        artistName: song.artistName,
        previewUrl: song.previewUrl,
        artworkUrl100: song.artworkUrl100,
      }

      commit('addToPlaylist', songObj)
      var playlistObj = { "songs": state.playlist }

      playlistapi.post(state.playlistId, playlistObj)
        .then(res => {
          console.log(res)
          // commit('setPlaylist', res.data.songs)
        }).catch(err => { alert(err) })
    },

    //remove a song from playlist by song Id
    removeFromPlaylist({ dispatch, commit, state }, songId) {
      commit('removeFromPlaylist', songId)
      var playlistObj = { "songs": state.playlist }
      playlistapi.post(state.playlistId, playlistObj)
        .then(res => {
          console.log('removed')
          // commit('setPlaylist', res.data.songs)
        }).catch(err => { alert(err) })
    },

    //move song position up
    upSongPosition({dispatch, commit, state}, songId){
      commit('upSongPosition', songId)
      var playlistObj = { "songs": state.playlist }
      playlistapi.post(state.playlistId, playlistObj)
      .then(res =>{
        console.log('changed')
      })
    },

    //move song position down
    downSongPosition({dispatch, commit, state}, songId){
      commit('downSongPosition', songId)
      var playlistObj = { "songs": state.playlist }
      playlistapi.post(state.playlistId, playlistObj)
      .then(res =>{
        console.log('changed')
      })
    },




    //handle play pause
    playPause({commit, dispatch,state}, songSrc){
      if (state.playing){
        // this.pauseSong(src)
        state.currentSong.pause()
        state.playing = false
        
        if (songSrc !== state.currentSong.src){
          // this.playSong(src)
          state.currentSong.src = songSrc
          state.currentSong.play()
          state.playing = true
        }
      }else {
        // this.playSong(src)
        state.currentSong.src = songSrc
        state.currentSong.play()
          state.playing = true
      }
    }

  }
})
