var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
require('./db/mlab-config')

app.use(express.static(__dirname + '/../www/dist'))

app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

//add when doing auth
// let auth = require('./server-assets/auth/routes')
// app.use(auth.session)
// app.use(auth.router)

// routes

var playlists = require('./routes/playlists')
var songs = require('./routes/playlists')

app.use(playlists.router)

//catch all
app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


app.listen(port, () => {
  console.log('server running on port', port)
})