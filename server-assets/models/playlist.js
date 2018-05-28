var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Playlist'

let songSchema = new Schema({
  trackName:{type: String, require: true},
  collectionName:{type:String, require:true},
  artistName:{type:String, require:true},
  previewUrl:{type:String, require:true},
  artworkUrl100:{type:String, require:true},

})
let schema = new Schema({
  title: {type: String, require: true},
  songs: [songSchema]
})

schema.pre('save', function(next){
  this.markModified('songs')
  next()
})

module.exports = mongoose.model(schemaName, schema)