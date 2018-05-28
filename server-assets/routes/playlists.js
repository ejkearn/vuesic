var router = require('express').Router()
var Playlists = require("../models/playlist")
var Song = require("../models/playlist")


//routs

//get playlists
router.get('/api/lists/:listId?', (req,res,next)=>{
  if (!req.params.listId){
    Playlists.find({}).then(lists =>{
      res.send(lists)
    })
  }else{
    Playlists.findById(req.params.listId)
    .then(list =>{
      res.send(list)
    })
  }
})

//create playlist
router.post('/api/lists', (req, res, next)=>{
  Playlists.create(req.body).then(list=>{
    res.send(list)
  })
})



//modify playlist,  changes whole playlist to new req.body
router.post('/api/lists/:listId', (req, res, next)=>{
  Playlists.findByIdAndUpdate(req.params.listId, req.body)
  .then(list =>{
    res.send(list)
  }).catch(err=>{
    res.send({
      error:'error'}
    )
  })
})

//add single song
router.put('/api/lists/:listId', (req,res,next)=>{
  console.log('here')
  Playlists.findById(req.params.listId)
  .then(list=>{
    list.songs.$addToSet(req.body)
    list.save()
      .then(() =>{
        res.send(list)
      })
  })
})



module.exports = {
  router
}