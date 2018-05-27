var mongoose = require('mongoose')
var connectionString = 'mongodb://jack:password@ds123500.mlab.com:23500/junk'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})