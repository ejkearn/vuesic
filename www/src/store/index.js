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
    createNewPlaylist({ dispatch, commit }, ) {
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
    }



  }
})
