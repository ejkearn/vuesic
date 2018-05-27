var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Playlist'

let songSchema = new Schema({
  title:{type: String, require: true},
  album:{type:String, require:true},
  artist:{type:String, require:true},
  songUrl:{type:String, require:true},
  imgUrl:{type:String, require:true},

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