import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import axios from 'axios'

var endURL = '&media=music'

let api = axios.create({
  baseURL: 'https://itunes.apple.com/search?term=',
  timeout: 3000
})

let playlistapi = axios.create({
  baseURL: 'http://localhost:3000/api/lists/',
  timeout: 3000
})

vue.use(vuex)

export default new vuex.Store({
  state: {
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
      var temp = []
      temp = state.playlist
      temp.push(songObj)
      state.playlist = temp
      temp = []
      
    },
    setPlaylistId(state, playlistId) {
      state.playlistId = playlistId
    }

  },
  actions: {
    getResults({ dispatch, commit }, query) {
      api.get(query + endURL)
        .then(res => {
          console.log(res.data.results)
          commit('setResults', res.data.results)
        }).catch(err => alert(err))
    },

    getPlaylist({ dispatch, commit, state }, playlistId) {
      playlistapi.get(state.playlistId)
        .then(res => {
          console.log(res.data)
          commit('setPlaylist', res.data.songs)
        }).catch(err => alert(err))
    },
    setPlaylistId({ dispatch, commit }, playlistId) {
      commit('setPlaylistId', playlistId)
    },

    createNewPlaylist({dispatch, commit}, ){

    },

    addToPlaylist({ dispatch, commit, state }, song) {
      // console.log('top')

      var songObj = {
        title: song.trackName,
        album: song.collectionName,
        artist: song.artistName,
        songUrl: song.previewUrl,
        imgUrl: song.artworkUrl100,
      }
      // console.log(songObj)
      // commit('addToPlaylist', songObj)
      // console.log(this.playlist)
      // console.log({"songs": this.playlist})
      var temp = []
      temp = state.playlist
      temp.push(songObj)
      state.playlist = temp
      state.playlist2 = state.playlist
      var playlistObj = {"songs": state.playlist}
        // console.log(state.playlist)
      playlistapi.post(state.playlistId, playlistObj)
        .then(res=>{
          // console.log(this.playlist)
          console.log('1')
          console.log(res)
          commit('setPlaylist', res.data.songs)
        }).catch(err=>{alert(err)})
    },
    tryLog({dispatch, commit, state}, ){
      console.log(this.playlist)
    }, 
    sendTestSong({dispatch, commit, state},){
      playlistapi.post(state.playlistId, {"songs": [state.testSong]})
        .then(res=>{
          console.log(res)
          commit('setPlaylist', res.data.songs)
        }).catch(err=>{ alert(err)})
    }

  }
})
